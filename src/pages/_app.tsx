"use client";
import { ClientSessionProvider } from "@/components/ClientSessionProvider";
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
      <ClientSessionProvider>
      <Component {...pageProps} />
      </ClientSessionProvider>
  );
}

export default MyApp;
