import * as React from "react";
import Image from "next/image";

import { IPlaylist } from "@/types/IPlaylist";

import { songs } from "@/constants/songs.constant";

import IcPlayCircleFilled from "@/assets/icons/IcPlayCircleFilled";
import PlaylistShowcaseItem from "./PlaylistShowcaseItem";

export interface IPlaylistShowcaseProps {
  playlist: IPlaylist;
}

export default function PlaylistShowcase(props: IPlaylistShowcaseProps) {
  const { playlist } = props;

  return (
    <div className="relative">
    <div className="absolute inset-0 bg-black opacity-70"></div>
    <div className="rounded-[4px] p-6 gap-6 flex bg-center items-center bg-cover bg-[url(../assets/images/rain.jpeg)]">
      <Image
        style={{ objectFit: "cover" }}
        className="size-[200px] p-[10px] gap-[10px] z-10"
        src={playlist.image}
        alt=""
      />
      <IcPlayCircleFilled classes="absolute z-20 top-[34%] left-[9.6%] cursor-pointer" />
        <div className="overflow-y-auto h-full w-full z-20">
            {playlist.songs.map(function (data) {
                return <PlaylistShowcaseItem songId={data} />
            })}
        </div>
    </div>
    </div>
  );
}
