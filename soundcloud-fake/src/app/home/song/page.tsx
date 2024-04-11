"use client";

import * as React from "react";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";

import { songs } from "@/constants/songs.constant";
import { playlists } from "@/constants/playlists.constant";

import SongViewShowcase from "@/components/share/SongShowcase/SongViewShowcase";
import SongViewInfo from "@/components/pages/SongViewInfo";
import SongShowcase from "@/components/pages/SongShowcase";
import SongViewAction from "@/components/share/SongViewAction/songViewAction";
import { IPlaylist } from "@/types/IPlaylist";

export interface ISongViewProps {
  playlist: IPlaylist;
}

export default function SongView(props: ISongViewProps) {
  const { playlist } = props;

  const [currentSongIndex,setCurrentSongIndex] = useState()

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col relative w-[1400px] gap-[64px] mt-12">
        <div className="flex gap-12">
          <div className="flex flex-col gap-6 w-[900px]">
            <SongViewShowcase song={songs[0]} />
            <SongViewAction song={songs[0]} />
            <SongViewInfo playlist={playlists[0]} />
          </div>
          <div className="w-[452px] flex flex-col border border-[#DCDCDC] rounded-[4px]">
            {playlists[0].songs.map((songId, id) => {
              return (
                <div>
                  <SongShowcase
                    song={songs[songId]}
                    no={id}
                    inSongView={true}
                    classes="!min-w-min !px-[12px] !py-[8px] gap-3"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
