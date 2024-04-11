"use client";

import IcHeart from "@/assets/icons/IcHeart";
import IcPlay from "@/assets/icons/IcPlay";
import { ISong } from "@/types/ISong";
import Image from "next/image";
import * as React from "react";

export interface ISongShowcaseProps {
  no: number;
  song: ISong;
  inSongView?: boolean;
  classes?: string;
}

export default function SongShowcase(props: ISongShowcaseProps) {
  const { no, song, inSongView, classes } = props;

  const activeHeart = () => {};

  return (
    <div className={`min-w-[887px] flex items-center border-b border-[#DCDCDC] p-2 hover:bg-[#F9F9F9] ${classes}`}>
      <div className={`flex items-center content-center font-medium text-sm leading-[21px] ${!inSongView ? 'w-[60px]' : ''}`}>
        {no}
      </div>
      <div className="flex items-center gap-4 w-full">
        <Image
          className="size-[46px] rounded-[4px] object-cover"
          src={song.image}
          alt=""
        />
        <div>
          <p className="font-medium text-[14px] leading-[21px] ">{song.name}</p>
          <div className={`flex items-center gap-[10px] font-medium text-[10px] leading-15px ${inSongView && 'text-[#979797]'}`}>
            {!inSongView ? (
              <>
                <div className="flex items-center gap-[4px]">
                  <IcPlay color="black" classes="w-[10px] h-[10px]" />
                  {song.plays}
                </div>
                <div className="flex items-center gap-[4px]">
                  <IcHeart size="10" />
                  {song.likes}
                </div>
              </>
            ) : (
              <>{song.artist}</>
            )}
          </div>
        </div>
      </div>
      {!inSongView && (
        <>
          <div className="w-[150px] px-[10px] py-2 text-sm leading-[21px]">
            {song.artist}
          </div>
          <div className="w-[140px] px-[10px] py-2 text-sm leading-[21px]">
            {song.genre}
          </div>
          <div className="w-[80px] px-[10px] py-2 text-sm leading-[21px]">
            {song.length}
          </div>
          <div className="w-[100px] px-[10px] py-2 text-sm leading-[21px] flex gap-4">
            <IcPlay color="black" classes="w-[20px] h-[20px]" />
            <IcHeart onClick={activeHeart} />
          </div>
        </>
      )}
    </div>
  );
}
