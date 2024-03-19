import * as React from "react";

import Image from "next/image";

import btnLeft from "@/assets/app/btn-left.svg";
import btnRight from "@/assets/app/btn-right.svg";

import TopPlaylistAuthorShowcase from "@/components/pages/TopPlaylistAuthorShowcase";
import { orderedPopularPlaylist } from "@/utils/orderPopularPlaylists";
import { orderedPopularArtists } from "@/utils/orderPopularArtist";
import TopArtist from "@/components/pages/TopArtist";
import { songs } from "@/constants/songs.constant";
import SongShowcase from "@/components/pages/SongShowcase";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const moveLeft = () => {};

  const moveRight = () => {};

  const popularPlaylists = orderedPopularPlaylist();
  const popularArtists = orderedPopularArtists();

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col relative w-[1400px] gap-[64px] mt-12">
        <div className="gap-[14px] ">
          <div className="relative font-bold text-4xl leading-[54px]">
            Top Playlist
            <div className="absolute top-[30%] right-0 flex align-middle content-middle gap-2">
              <Image src={btnLeft} alt="" />
              <Image src={btnRight} alt="" />
            </div>
          </div>
          <div className="gap-4 flex overflow-hidden">
            {popularPlaylists.map(function (data) {
              return (
                <TopPlaylistAuthorShowcase
                  key={data.id}
                  playlistId={data.id}
                  name={data.name}
                  popularSongIndex={data.songs[0]}
                />
              );
            })}
          </div>
        </div>
        <div className="flex gap-6">
          <div>
            <div className="content-center font-bold text-4xl leading-[54px] pl-6">
              Liked songs
            </div>
            {songs.map(function (data) {
              return <SongShowcase song={data} no={data.id} />;
            })}
          </div>
          <div className="flex flex-col content-center w-1/3 ml-auto">
            <div className="content-center font-bold text-4xl leading-[54px] pl-6">
              Top Artists
            </div>
            <div className="gap-6 py-4 px-6 flex flex-col content-center">
              {popularArtists.map(function (data) {
                return <TopArtist key={data.id} name={data.name} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
