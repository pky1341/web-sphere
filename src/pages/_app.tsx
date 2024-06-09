"use client";
import { ClientSessionProvider } from "@/components/ClientSessionProvider";
// import { Auth0Provider } from '@auth0/auth0-react';
// import { UserProvider } from '@auth0/nextjs-auth0'
import Auth0ProviderWrapper from "@/auth/auth0-provider";
import { auth0Config } from "@/auth/auth0";
import React from "react";
import { createContext } from "react";
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
    session: Session | any;
    // [key: string]: any;
  };
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0ProviderWrapper>
      <ClientSessionProvider>
      <Component {...pageProps} />
      </ClientSessionProvider>
    </Auth0ProviderWrapper>
  );
}

export default MyApp;
