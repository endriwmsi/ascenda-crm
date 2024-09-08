import ContextProvider from "./context-provider";
import AuthProvider from "./auth-provider";
// import { RedirectProvider } from "./redirect-provider";
import React from "react";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ContextProvider>{children}</ContextProvider>
      {/* <RedirectProvider>
      </RedirectProvider> */}
    </AuthProvider>
  );
};

export default AppProviders;
