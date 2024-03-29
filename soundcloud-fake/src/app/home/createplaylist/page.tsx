"use client";

import CreatePlaylistProgress from "@/components/share/CreatePlaylistProgress/CreatePlaylistProgress";
import camera from "@/assets/app/camera.svg";
import * as React from "react";
import { useState } from "react";
import Image from "next/image";

import InpTextField from "@/components/share/InpTextField/InpTextField";

export interface ICreatePlaylistProps {}

export default function CreatePlaylist(props: ICreatePlaylistProps) {
  const [page, setPage] = useState(1);

  return (
    <div className="flex items-center justify-center my-[110px] mx-[260px]">
      <div className="flex gap-[31px] flex-col w-[1400px] content-center items-center">
        <h1 className="font-bold text-4xl leading-[54px] h-[54px]">
          Create new Playlist
        </h1>
        <CreatePlaylistProgress page={page} setPage={setPage} />
        <div className="flex w-[645px] rounded-[10px] border border-[#DCDCDC] gap-6 px-6 pt-[32px] pb-[18px]">
          <div className="relative bg-gradient-to-br from-red-500 to-blue-500 size-[200px] rounded-[4px]">
            <button className="absolute items-center justify-center flex top-[162px] left-[44px] gap-1 w-[111px] px-1 py-[2px] bg-[#F6F6F6]">
              <Image src={camera} alt="" />
              <div className="text-nowrap text-[10px] leading-[15px]">
                Upload Image
              </div>
            </button>
          </div>
          <div>
            <div>
              <div className="flex items-center size-[10px] leading-[15px]">
                <p>Title </p>
                <p className="text-[#FF4040]">*</p>
              </div>
                <InpTextField onChange={()=>{}} />
            </div>
            <div>
              <div className="flex items-center size-[10px] leading-[15px]">
                <p>Title </p>
                <p className="text-[#FF4040]">*</p>
              </div>
                <InpTextField onChange={()=>{}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
