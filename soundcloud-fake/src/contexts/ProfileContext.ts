import React, { useContext } from "react";
import { Dispatch, SetStateAction /* and others */ } from "react";

import { IUser } from "@/types/IUser";

export interface IUserProfileContext {
  profile: IUser | null;
  setProfile: any;
}

export const UserProfileContext = React.createContext<IUserProfileContext>({
  profile: null,
  setProfile: () => {},
});

export const useUserProfileContext = () => useContext(UserProfileContext);
