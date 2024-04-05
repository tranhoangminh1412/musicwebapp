"use client";

import * as React from "react";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";

import { songs } from "@/constants/songs.constant";

import Slider from "@/components/share/Slider/Slider";
import SongViewShowcase from "@/components/share/SongShowcase/SongViewShowcase";

export interface ISongViewProps {}

export default function SongView(props: ISongViewProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col relative w-[1400px] gap-[64px] mt-12">
        <div className="flex gap-12">
          <div className="flex flex-col gap-6 flex-grow">
            <SongViewShowcase song={songs[0]} />
          </div>
          <div className="w-[452px]">hello</div>
        </div>
      </div>
    </div>
  );
}
