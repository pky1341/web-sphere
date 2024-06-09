import React,{ReactNode} from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWrapper = ({ children }:{children:ReactNode}) => {
  const domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_CLIENT_ID;
console.log(`heloonc ${domain}`);
  if (!domain || !clientId) {
    throw new Error("Missing Auth0 configuration");
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={`${window.location.origin}/api/auth/callback`}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWrapper;
