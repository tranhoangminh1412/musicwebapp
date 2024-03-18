import * as React from "react";

import Image from "next/image";

import btnLeft from "@/assets/app/btn-left.svg";
import btnRight from "@/assets/app/btn-right.svg";

import TopPlaylistAuthorShowcase from "@/components/pages/TopPlaylistAuthorShowcase";
import { orderedPopularPlaylist } from "@/utils/orderPopularPlaylists";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const moveLeft = () => {};

  const moveRight = () => {};
  
  const popularPlaylists = orderedPopularPlaylist();

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[1400px] gap-[24px] mt-12">
      <div className="gap-[14px] "> 
          <div className="relative font-bold text-4xl leading-[54px]">
            Top Playlist
            <div className="absolute top-[30%] right-0 flex align-middle content-middle gap-2">
              <Image src={btnLeft} alt="" />
              <Image src={btnRight} alt="" />
            </div>
          </div>
          <div className="gap-4 flex overflow-hidden">
          {popularPlaylists.map(function(data) {
            return <TopPlaylistAuthorShowcase playlistId={data.id} name={data.name} popularSongIndex={data.songs[0]} />
          })}
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}
