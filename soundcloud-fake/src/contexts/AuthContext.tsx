"use client";

import React, { useContext } from "react";

export interface IAuthContext {
  authenticated: boolean;
  setAuthenticated: any;
}

export const AuthContext = React.createContext<IAuthContext>({
  authenticated: false,
  setAuthenticated: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
