import { StaticImageData } from "next/image";

export type IArtist = {
    id: number;
    name: string;
    plays: number;
    image: StaticImageData;
};