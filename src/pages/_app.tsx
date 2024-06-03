
"use client";
import { ClientSessionProvider } from "@/components/ClientSessionProvider";
import { Auth0Provider } from '@auth0/auth0-react';
// import { UserProvider } from '@auth0/nextjs-auth0'
import { auth0Config } from "@/auth/auth0";
import React from 'react';
import { createContext } from 'react';
interface Session {
  user: {
    id: string;
    name: string;
    email: string;
  };
  expires: string;
}

interface AppProps {
  Component: any;
  pageProps: {
    session: Session|any;
    // [key: string]: any;
  };
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider {...auth0Config} domain={auth0Config.domain || ""} clientId={auth0Config.clientId || ""}>
    <ClientSessionProvider>
      <Component {...pageProps} />
    </ClientSessionProvider>
    </Auth0Provider>
  );
}

export default MyApp;
