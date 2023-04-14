import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    // protectedProcedure,
} from "~/server/api/trpc";

export const contactsRouter = createTRPCRouter({

    getContacts: publicProcedure.input(z.object({ email: z.string() })).query(({ ctx, input }) => {
        return ctx.prisma.contact.findMany({
            where: {
                AND: {
                    OR: [
                        {
                            receiverEmail: {
                                equals: input.email
                            },
                        },
                        {
                            senderEmail: {
                                equals: input.email
                            }
                        }
                    ],
                    status: {
                        equals: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                senderEmail: true,
                receiverEmail: true,
                sender: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
            }

        });
    }),

    getContactByEmail: publicProcedure.input(z.object({ email: z.string() })).mutation(({ ctx, input }) => {
        return ctx.prisma.user.findUnique({
            where: {
                email: input.email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
            }
        });
    }),

    getContact: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
        return ctx.prisma.user.findUnique({
            where: {
                id: input.id,
            },
            select: {
                name: true,
                email: true,
                image: true,
            }
        });
    }),


    createContact: publicProcedure.input(z.object({ sender: z.string(), receiver: z.string() })).mutation(async ({ ctx, input }) => {

        const validateContact = await ctx.prisma.contact.findFirst({
            where: {
                AND: [
                    {
                        OR:{
                            senderEmail: {
                                equals: input.sender
                            },
                            receiverEmail: {
                                equals: input.sender
                            }
                        }
                    },
                    {
                        OR:{
                            senderEmail: {
                                equals: input.receiver
                            },
                            receiverEmail: {
                                equals: input.receiver
                            }
                        }
                    },
                ],
            },
        });

        if (validateContact) {
            if( !validateContact.status ){
                const contact = await ctx.prisma.contact.update({
                    where: {
                        id: validateContact.id,
                    },
                    data: {
                        status: true,
                    }
                });
                if (contact) {
                    return true;
                }
            }

            return true;
        }

        const contact = await ctx.prisma.contact.create({
            data: {
                senderEmail: input.sender,
                receiverEmail: input.receiver,
                status: true,
            }
        });

        if (contact) {
            return true;
        }

        return true;
    }),


    deleteContact: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const validateContact = await ctx.prisma.contact.findFirst({
            where: {
                id: input.id,
            },
        });
    
        if (!validateContact) {
            return false;
        }

        const contact = await ctx.prisma.contact.update({
            where: {
                id: input.id,
            },
            data: {
                status: false,
            }
        });

        if (contact) {
            return true;
        }

        return false;

    }),



    // hello: publicProcedure
    //     .input(z.object({ text: z.string() }))
    //     .query(({ input }) => {
    //         return {
    //             greeting: `Welcome ${input.text}`,
    //         };
    //     }),

    // getAll: publicProcedure.query(({ ctx }) => {
    //     return ctx.prisma.example.findMany();
    // }),

    // getSecretMessage: protectedProcedure.query(() => {
    //     return "you can now see this secret message!";
    // }),
});