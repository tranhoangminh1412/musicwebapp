"use client";

import React, { useContext } from "react";

import { IFirebaseUser } from "@/types/IFirebaseUser";

export interface IUserProfileContext {
  profile: IFirebaseUser | null;
  setProfile: any;
}

export const UserProfileContext = React.createContext<IUserProfileContext>({
  profile: null,
  setProfile: () => {},
});

export const useUserProfileContext = () => useContext(UserProfileContext);
