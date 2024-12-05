import { ThemeProvider } from "./theme-provider";
import AuthProvider from "./auth-provider";
import React from "react";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AppProviders;
