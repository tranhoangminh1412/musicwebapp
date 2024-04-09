import { IArtist } from "@/types/IArtist";

import { artists } from "@/constants/artists.constant";
import { songs } from "@/constants/songs.constant";
import { playlists } from "@/constants/playlists.constant";

import defaultAva from "@/assets/app/765-default-avatar.png";

import { IUser } from "@/types/IUser";
import { users } from "@/constants/users.constant";

let defaultUser : IUser = {
  id: users[users.length - 1].id + 1,
  name: "Unknown User",
  username: "unknown",
  avatarUrl: "../../assets/app/765-default-avatar.png",
};

export const getPlaylistAuthor = (authorUsername: string): IUser => {
  users.forEach((user) => {
    if (user.username == authorUsername) {
      return user;
    } 
  });
  return defaultUser
};
