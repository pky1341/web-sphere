import React,{ReactNode} from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWrapper = ({ children }:{children:ReactNode}) => {
  const domain = "dev-4olrpp1brom7qrlp.us.auth0.com";
  const clientId = 'mIyOGEI3yUyhzuinhcM3jLfoYt02qAIX';
  if (!domain || !clientId) {
    throw new Error("Missing Auth0 configuration");
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={`http://localhost:3000/api/auth/callback`}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWrapper;
