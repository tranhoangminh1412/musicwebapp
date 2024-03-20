import { StaticImageData } from "next/image";

export type IPlaylist = {
  id: number;
  name: string;
  genre: string;
  songs: number[];
  image: StaticImageData;
};
