"use client";

import IcHeart from "@/assets/icons/IcHeart";
import IcPlay from "@/assets/icons/IcPlay";
import IcQueue from "@/assets/app/FooterQueue.svg";
import { ISong } from "@/types/ISong";
import Image from "next/image";
import * as React from "react";
import { useCurrentPlayingContext } from "@/contexts/CurrentPlayingContext";
import { getFirebaseFile, getFirebaseImage } from "@/firebaseConfig";
import { useSongContext } from "@/contexts/SongContext";

export interface ISongShowcaseProps {
  no: number;
  song: ISong;
  inSongView?: boolean;
  classes?: string;
}

export default function SongShowcase(props: ISongShowcaseProps) {
  const { no, song, inSongView, classes } = props;

  const { current, setCurrent } = useCurrentPlayingContext();

  const [img, setImg] = React.useState<string>();

  React.useEffect(() => {
    getFirebaseImage(song.image, setImg).catch((error) => {
      console.log("Error fetching Firebase images: " + error);
    });
  }, []);

  const getFile = async (name: string, set: any) => {
    await getFirebaseFile(name, set);
    return true;
  };

  const activeHeart = () => {};

  if (img) {
    return (
      <div
        className={`min-w-[887px] flex items-center border-b border-[#DCDCDC] p-2 hover:bg-[#F9F9F9] ${classes}`}
      >
        <div
          className={`flex items-center content-center font-medium text-sm leading-[21px] ${
            !inSongView ? "w-[60px]" : ""
          }`}
        >
          {no}
        </div>
        <div className="flex items-center gap-4 w-full">
          {img && (
            <Image
              className="size-[46px] rounded-[4px] object-cover"
              width={46}
              height={46}
              src={img}
              alt=""
            />
          )}
          <div>
            <p className="font-medium text-[14px] leading-[21px] ">
              {song.name}
            </p>
            <div
              className={`flex items-center gap-[10px] font-medium text-[10px] leading-15px ${
                inSongView && "text-[#979797]"
              }`}
            >
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
            <div className="w-[100px] px-[10px] py-2 text-sm leading-[21px] flex gap-4 ">
              <IcPlay color="black" classes="w-[20px] h-[20px]" />
              <IcHeart onClick={activeHeart} />
              <Image
                src={IcQueue}
                alt=""
                className="cursor-pointer"
                onClick={() => {
                  if (current && current.length > 0) {
                    setCurrent([...current, song.id]);
                  } else {
                    setCurrent([song.id]);
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div
        className={`min-w-[887px] min-h-[63.22px] flex items-center justify-center border-b border-[#DCDCDC] p-2 hover:bg-[#F9F9F9] ${classes}`}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="none"
            stroke="#979797"
            strokeWidth="4"
            strokeDasharray="40"
            strokeDashoffset="0"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0; 314"
              keyTimes="0; 1"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    );
  }
}
