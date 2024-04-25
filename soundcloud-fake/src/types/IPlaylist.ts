import { StaticImageData } from "next/image";

export type IPlaylist = {
  id: number,
  name: string,
  genre?: string,
  songs: number[],
  image: string | StaticImageData,
  artist?: string,
  slug?: string,
  author: string,
  description?: string,
};
