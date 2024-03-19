import * as React from "react";

import { artists } from "@/constants/artists.constant";
import { songs } from "@/constants/songs.constant";

import defaultImage from "@/assets/images/SD-default-image.png";
import IcPlay from "@/assets/icons/IcPlay";

import { IArtist } from "@/types/IArtist";

import Image from "next/image";

export interface ITopArtistProps {
  name: string;
}

export default function TopArtist(props: ITopArtistProps) {
  const { name } = props;
  let artist: IArtist = {
    id: 0,
    name: "",
    plays: 0,
    image: defaultImage,
  };

  artists.forEach((a) => {
    if (a.name == name) {
      artist = a;
    }
  });

  return (
    <div className="flex gap-6 items-center">
      <Image
        style={{objectFit: 'cover'}}
        className="rounded-full bg-cover size-20 drop-shadow-xl"
        src={artist.image}
        alt=""
      />
      <div className="flex flex-col items-center content-center">
        <p className="font-bold text-base">{name}</p>
      </div>
      <div className="py-[2px] px-[14px] rounded-l-[4px] rounded-r-[14px] bg-[#242424] gap-2 flex items-center content-center text-base font-medium text-white h-[28px] min-w-[110px] ml-auto">
        <IcPlay />
        {artist.plays}
      </div>
    </div>
  );
}
