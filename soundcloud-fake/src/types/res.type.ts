import { IPlaylist } from "./IPlaylist";
import { ISong } from "./ISong";
import { IUser } from "./IUser";

export interface IResUserProfile {
  data: IUser[];
}

export interface IResPlaylist {
  data: IPlaylist[];
}

export interface IResSongs {
  data: ISong[];
}