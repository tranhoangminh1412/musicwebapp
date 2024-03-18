import * as React from "react";

import { playlists } from "@/constants/playlists.constant";
import { songs } from "@/constants/songs.constant";
import { artists } from "@/constants/artists.constant";

import { IArtist } from "@/types/IArtist";

export interface ITopPlaylistAuthorShowcaseProps {
  playlistId: number;
  name?: string;
  popularSongIndex?: number;
}

export default function TopPlaylistAuthorShowcase(
  props: ITopPlaylistAuthorShowcaseProps
) {
  const { playlistId = 0, name = "", popularSongIndex = 0 } = props;

  const topSong = () => {
    let s;
    let max = 0;
    for (let i = 0; i < playlists[playlistId].songs.length; i++) {
      if (max < songs[playlists[playlistId].songs[i]].plays) {
        max = songs[playlists[playlistId].songs[i]].plays;
        s = songs[playlists[playlistId].songs[i]];
      }
    }
    return s;
  };

  const topSongArtist = (): IArtist => {
    let song = topSong();
    let a = artists[0]

    artists.forEach((artist) => {
      if (artist.name == song?.name) {
        return artist
      }
    });

    for (let i = 0; i < artists.length; i++) {
        if (artists[i].name == song?.name) {
            return artists[i]
          }
    }
    return a;
  };

  // let imgClass = `bg-[url('../assets/images/${topSongArtist().image}')]`

  console.log(topSongArtist().image)

  return (
    <div
      className={`relative w-[285px] h-[185px] bg-cover `}
    >
        <div className="absolute bottom-0 bg-gradient-to-t from-black w-[100%] h-[76px] flex align-middle py-3" >
            <title className="font-bold text-lg text-white">
                {topSongArtist().name}
            </title>
            <p className="text-white font-normal text-sm">
                {topSong()?.name}
            </p>
        </div>
    </div>
  );
}
