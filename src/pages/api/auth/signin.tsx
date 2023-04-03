import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";





export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              asdasd {provider.name}
            </button>
          </div>
        ))
      }
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/dashboard" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  }
}

