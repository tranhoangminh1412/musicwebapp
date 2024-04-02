"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";

import CreatePlaylistProgress from "@/components/share/CreatePlaylistProgress/CreatePlaylistProgress";
import CreatePlaylist1 from "@/components/pages/CreatePlaylist1";
import CreatePlaylist2 from "@/components/pages/CreatePlaylist2";

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
        <div
          className={`flex flex-col gap-6 rounded-[10px] border border-[#DCDCDC] px-6 pt-[32px] pb-[72px] min-h-[365px] ${
            page == 2 && "min-h-[365px] bg-songSearchBg bg-no-repeat bg-center relative"
          }`}
        >
          {page == 1 ? (
            <CreatePlaylist1 setPage={setPage} />
          ) : page == 2 ? (
            <CreatePlaylist2 />
          ) : page == 3 ? (
            <></>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
