import * as React from "react";
import Image from "next/image";

import { IPlaylist } from "@/types/IPlaylist";

import { songs } from "@/constants/songs.constant";

import IcPlayCircleFilled from "@/assets/icons/IcPlayCircleFilled";
import PlaylistShowcaseItem from "./PlaylistShowcaseItem";

import { getFirebaseImage } from "../../../firebaseConfig";

export interface IPlaylistShowcaseProps {
  playlist: IPlaylist;
}

export default function PlaylistShowcase(props: IPlaylistShowcaseProps) {
  const { playlist } = props;

  const [img, setImg] = React.useState<string>();

  getFirebaseImage("rain.jpeg",setImg)

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className={`rounded-[4px] p-6 gap-6 flex bg-center items-center bg-cover text-white`}
      >
        {img && (
          <Image
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
            className="size-[200px] p-[10px] gap-[10px] z-10"
            src={img}
            alt=""
          />
        )}
        <IcPlayCircleFilled classes="absolute z-20 top-[34%] left-[9.6%] cursor-pointer" />
        <div className="overflow-y-auto h-full w-full z-20">
          <div className="text-white font-medium z-30 text-nowrap">
            {playlist.name}
          </div>
          {playlist.songs.map((data) => {
            return <PlaylistShowcaseItem key={data} songId={data} />;
          })}
        </div>
      </div>
    </div>
  );
}
