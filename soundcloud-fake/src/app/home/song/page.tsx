"use client";

import * as React from "react";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import axios from "axios";

import { playlists } from "@/constants/playlists.constant";

import SongViewShowcase from "@/components/share/SongShowcase/SongViewShowcase";
import SongViewInfo from "@/components/pages/SongViewInfo";
import SongShowcase from "@/components/pages/SongShowcase";
import SongViewAction from "@/components/share/SongViewAction/SongViewAction";

import { IPlaylist } from "@/types/IPlaylist";
import { IResSongs } from "@/types/res.type";
import { ISong } from "@/types/ISong";

import { useCurrentPlayingContext } from "@/contexts/CurrentPlayingContext";
import { getSongs } from "@/utils/getDataFromFirebase";

export interface ISongViewProps {
  playlist: IPlaylist;
}

export default function SongView(props: ISongViewProps) {
  const { playlist } = props;

  const [songs, setSongs] = useState<ISong[]>([]);
  const { current, setCurrent } = useCurrentPlayingContext();

  React.useEffect(() => {
    getSongs(setSongs)
  }, []);

  if (songs && current && current?.length != 0){
    return (
      <div className="flex justify-center h-[100vh]">
        <div className="flex flex-col relative w-[1400px] gap-[64px] mt-12">
          <div className="flex gap-12">
            <div className="flex flex-col gap-6 w-[900px]">
              
                  <SongViewShowcase song={songs[current[0]]} />
                  <SongViewAction song={songs[current[0]]} />
                  <SongViewInfo song={songs[current[0]]}  />
            </div>
            <div className="w-[452px] flex flex-col border border-[#DCDCDC] rounded-[4px]">
              {current.map((songId, id) => {
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
  else return <div>404 Not Found</div>;
}
