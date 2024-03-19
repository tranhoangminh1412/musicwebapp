import { StaticImageData } from "next/image";

export type ISong = {
  id: number;
  name: string;
  artist: string;
  length: string;
  plays: number;
  genre: string;
  image: StaticImageData;
  likes: number;
};
