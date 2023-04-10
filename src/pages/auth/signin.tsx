import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import LoginIcon from "~/components/LoginIcons";
import Loader from "~/components/Loader";




export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <>

      <main className="container mx-auto">
        <Loader />
        <section className='flex justify-center items-center h-screen'>
          <div className="relative items-center w-full px-5 mx-auto md:px-12 lg:px-20 max-w-7xl">
            <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
              <div className="flex flex-col">
                <div>
                  <h2 className="text-4xl text-black text-center">
                    Sign In
                  </h2>
                </div>
              </div>
              <div>
                <div className="mt-6 space-y-6">
                  {Object.values(providers).map((provider) => (

                    <div key={provider.name} className="col-span-full">
                      {
                        <button onClick={ () => void signIn(provider.id)} type="button" className="inline-flex items-center justify-center w-full px-6 py-3 text-center text-black duration-200 bg-white border-2 border-black hover:bg-transparent hover:border-black rounded-xl hover:text-black focus:outline-none focus-visible:outline-black focus-visible:ring-black">
                          <LoginIcon icon={provider.name} />
                          With {provider.name}
                        </button>
                      }
                    </div>
                  ))
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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

