"use client";
import * as React from "react";

import { store } from "@/store";

import { Provider as ReduxProvider } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { UserProfileContext } from "@/contexts/ProfileContext";
import { AuthContext } from "@/contexts/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = React.useState<any>(null);
  const [authenticated, setAuthenticated] = React.useState<any>(false);

  const clientId =
    "752827926431-6n24u15f6k9al524t0j9hpa2bi24f4f9.apps.googleusercontent.com";

  return (
    <ReduxProvider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <UserProfileContext.Provider value={{ profile, setProfile }}>
          <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
          </AuthContext.Provider>
        </UserProfileContext.Provider>
      </GoogleOAuthProvider>
    </ReduxProvider>
  );
}
