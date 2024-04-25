"use client";

import * as React from "react";
import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import axios from "axios";

import btnLeft from "@/assets/app/btn-left.svg";
import btnRight from "@/assets/app/btn-right.svg";

import { orderedPopularPlaylist } from "@/utils/orderPopularPlaylists";
import { orderedPopularArtists } from "@/utils/orderPopularArtist";

import { songs } from "@/constants/songs.constant";

import TopArtist from "@/components/pages/TopArtist";
import SongShowcase from "@/components/pages/SongShowcase";
import ListPages from "@/components/share/ListPages/ListPages";
import PlaylistShowcase from "@/components/share/PlaylistShowcase/PlaylistShowcase";
import TopPlaylistAuthorContainer from "@/components/pages/TopPlaylistAuthorContainer";
import { IPlaylist } from "@/types/IPlaylist";
import { IResPlaylist } from "@/types/res.type";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  let showSongIndex: number = 0;
  let maxSongShowcase = 10;

  const router = useRouter();

  const moveLeft = () => {};
  const moveRight = () => {};

  const popularPlaylists = orderedPopularPlaylist();
  const popularArtists = orderedPopularArtists();

  let numLikedPages = Math.floor(songs.length / maxSongShowcase);
  if (songs.length % maxSongShowcase != 0) numLikedPages += 1;

  const fetchPlaylists = async () => {
    const data = await axios.get("/api/playlists");
    console.log(data);

    return data.data;
  };

  const getPlaylists = async () => {
    try {
      const resPlaylist = (await fetchPlaylists()) as IResPlaylist;
      setPlaylists(resPlaylist.data);
    } catch (err) {
      console.log("error getting playlist");
      setPlaylists([]);
    }
  };
  
  const getIt = () => {
    getPlaylists();
  };

  React.useEffect(()=>{
    getIt();
  },[])


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
          <TopPlaylistAuthorContainer />
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-6">
            <div>
              <div className="content-center font-bold text-4xl leading-[54px]">
                Liked songs
              </div>
              <div className="min-w-[887px] flex items-center border-b border-[#DCDCDC] p-2">
                <div className="flex items-center content-center font-medium text-sm leading-[21px] w-[60px]">
                  No
                </div>
                <div className="flex items-center gap-4 w-full text-sm leading-[21px]">
                  Song
                </div>
                <div className="w-[150px] px-[10px] py-2 text-sm leading-[21px]">
                  Author
                </div>
                <div className="w-[140px] px-[10px] py-2 text-sm leading-[21px]">
                  Genre
                </div>
                <div className="w-[80px] px-[10px] py-2 text-sm leading-[21px]">
                  Length
                </div>
                <div className="w-[100px] px-[10px] py-2 text-sm leading-[21px] flex gap-4"></div>
              </div>
              {songs.map(function (data) {
                if (
                  showSongIndex < maxSongShowcase &&
                  data.id < currentPage * maxSongShowcase &&
                  data.id > (currentPage - 1) * maxSongShowcase - 1
                ) {
                  showSongIndex += 1;
                  return (
                    <SongShowcase key={data.id} song={data} no={data.id + 1} />
                  );
                }
              })}
              <ListPages
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                numPages={numLikedPages}
              />
            </div>
            <div className="relative content-center font-bold text-4xl leading-[54px]">
              My Playlists
              <div
                onClick={() => router.push("/home/createplaylist")}
                className="cursor-pointer absolute bottom-0 right-0 text-sm leading-[21px] text-[#0094FF]"
              >
                Create New
              </div>
            </div>
            {playlists.map((data) => {
              return <PlaylistShowcase key={data.id} playlist={data} />;
            })}
          </div>
          <div className="flex flex-col content-center w-1/3 ml-auto">
            <div className="relative content-center font-bold text-4xl leading-[54px] pl-6">
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
