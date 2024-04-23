import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "@/app/layout.tsx"; 
import {withSession} from '@/utils/withSession';
import {Header} from '@/components/header/Header';
function MyApp({ Component, pageProps }: AppProps) {
 return (
    <SessionProvider session={pageProps.session}>
      <Header {...pageProps} />
    </SessionProvider>
 );
}

export default MyApp;