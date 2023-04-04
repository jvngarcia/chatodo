import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { createContext, useState, Dispatch, SetStateAction } from "react";



interface LoaderContextInterface {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}


export const LoadingContext = createContext<LoaderContextInterface>({
  loading: false,
  setLoading: () => {}
});


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  
  const [ loading, setLoading ] = useState( false );
  
  return (
    <SessionProvider session={session}>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <Component {...pageProps} />
      </LoadingContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
