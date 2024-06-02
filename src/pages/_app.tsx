
import { ClientSessionProvider } from "@/components/ClientSessionProvider";
import { Auth0Provider } from '@auth0/auth0-react';
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
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENT_ID}
      redirectUri={process.env.AUTH0_REDIRECT_URI}
    >
    <ClientSessionProvider>
      <Component {...pageProps} />
    </ClientSessionProvider>
    </Auth0Provider>
  );
}

export default MyApp;
