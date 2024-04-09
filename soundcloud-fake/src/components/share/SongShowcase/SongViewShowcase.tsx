import * as React from "react";
import Image from "next/image";

import { songs } from "@/constants/songs.constant";

import IcPlayCircleFilled from "@/assets/icons/IcPlayCircleFilled";
import arrowLeft from "@/assets/app/angle-double-left.svg";
import arrowRight from "@/assets/app/angle-double-right.svg";
import play from "@/assets/app/songPlay.svg";
import repeat from "@/assets/app/Repeat.svg";
import volume from "@/assets/app/volume-up.svg";

import { ISong } from "@/types/ISong";

import Slider from "../Slider/Slider";

export interface ISongViewShowcaseProps {
  song: ISong;
}

export default function SongViewShowcase(props: ISongViewShowcaseProps) {
  const { song } = props;

  console.log(song.image.src);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black opacity-90 z-10"></div>
      <div className="rounded-[4px] gap-6 flex bg-center items-center bg-cover bg-[url(../assets/images/rain.jpeg)] text-white z-20">
        <div className="relative z-20 w-full">
          <div className="flex items-start gap-6 p-4">
            <Image
              style={{ objectFit: "cover" }}
              className="size-[98px] rounded-[4px] gap-[10px] z-20"
              src={song.image}
              alt=""
            />
            <div className="overflow-y-auto h-full w-full z-20 flex flex-col gap-1">
              <div className="text-2xl leading-[36px] text-white">
                {song.name}
              </div>
              <div className="text-[10px] leading-[15px] text-white">
                {song.artist}
              </div>
            </div>
          </div>
          <Slider inputClasses="h-[6px] " size="L" />
          <div className="flex gap-6 items-center z-30 py-[10px] px-4">
            <Image src={arrowLeft} alt="" />
            <Image src={play} alt="" />
            <Image src={arrowRight} alt="" />
            <Image src={repeat} alt="" />
            <div className="flex gap-2 w-[100px] items-center">
              <Image className="size-[20px]" src={volume} alt="" />
              <Slider inputClasses="!h-[4px]" progressSliderClasses="!h-[4px]" rounded={true} size="M" />
            </div>
            <div className="flex text-xs leading-[18px] text-white">
              00:47 <p className="text-[#979797]"> / 05:32</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
