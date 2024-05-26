
"use client";

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

interface ClientSessionProviderProps {
  children: React.ReactNode;
}

export function ClientSessionProvider({ children }: ClientSessionProviderProps) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
