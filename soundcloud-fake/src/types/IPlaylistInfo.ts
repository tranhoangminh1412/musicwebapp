import { ISong } from "./ISong";
import { StaticImageData } from "next/image";

export interface PlaylistInfo {
    title: string;
    slug: string;
    genre?: string;
    artist?: string;
    description?: string;
    songs: number[];
    img: StaticImageData;
}