import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const contactsRouter = createTRPCRouter({

    getContacts: publicProcedure.input(z.object({ email: z.string() })).query(({ ctx, input }) => {
        return ctx.prisma.message.findMany({
            where: {
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
                ]
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

    getContactByEmail: publicProcedure.input( z.object({ email: z.string() }) ).mutation(({ ctx, input }) => {
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

    // create contact
    createContact: publicProcedure.input(z.object({ sender: z.string(), receiver: z.string() })).mutation(({ ctx, input }) => {
        
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