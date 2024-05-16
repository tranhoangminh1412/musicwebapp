import * as React from "react";
import Image, { StaticImageData } from "next/image";

import InpTextField from "../share/InpTextField/InpTextField";
import CaseActionButton from "../share/CaseActionBtn/CaseActionBtn";

import search from "../../assets/app/search.svg";

import { songs } from "@/constants/songs.constant";
import PlaylistSongShowcase from "./PlaylistSongShowcase";
import { ISong } from "@/types/ISong";
import { PlaylistInfo } from "@/types/IPlaylistInfo";
import { playlists } from "@/constants/playlists.constant";
import { IPlaylist } from "@/types/IPlaylist";
import { useUserProfileContext } from "@/contexts/ProfileContext";
import { getSongs } from "@/utils/getDataFromFirebase";

export interface ICreatePlaylist2Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  updatePlaylistInfo: (
    key: keyof PlaylistInfo,
    value: string | number[] | StaticImageData
  ) => void;
  playlistInfo: PlaylistInfo;
}

let finalSongList: number[] = [];


export default function CreatePlaylist2(props: ICreatePlaylist2Props) {
  const { setPage, updatePlaylistInfo, playlistInfo } = props;

  const [showDropdown, setShowDropdown] = React.useState(true);
  const [selectedSong, setSelectedSong] = React.useState<ISong>();
  const [searchInput, setSearchInput] = React.useState<string>();
  const [songList, setSongList] = React.useState<ISong[]>([]);
  const [songs, setSongs] = React.useState<ISong[]>([]);
  const [error, setError] = React.useState(false);
  const {profile,setProfile} = useUserProfileContext()

  React.useEffect(()=>{
   getSongs(setSongs) 
  })

  React.useEffect(() => {
    let i = finalSongList.findIndex((song) => song == selectedSong?.id);
    if (i != -1) {
      finalSongList.splice(i, 1);
    } else {
      selectedSong && finalSongList.push(selectedSong.id);
    }
  }, [selectedSong]);

  React.useEffect(() => {
    if (searchInput) {
      const matchItems = songs.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSongList([...matchItems]);
    } else {
      setSongList([...songs]);
    }
  }, [searchInput]);

  const checkSongList = () => {
    if (finalSongList.length > 0) {
      return true;
    } else return false;
  };

  let formattedNewPlaylist: IPlaylist;

  const convertFormatNewPlaylist = () => {
    formattedNewPlaylist = {
      id: playlists[playlists.length-1].id + 1,
      name: playlistInfo.title,
      genre: playlistInfo.genre,
      songs: [...finalSongList],
      image: playlistInfo.img,
      artist: playlistInfo.artist,
      slug: playlistInfo.slug,
      author: 'author',
    };
    return formattedNewPlaylist;
  };

  const saveSelectedSongs = () => {
    if (checkSongList()) {
      updatePlaylistInfo("songs", [...finalSongList]);
      setPage(3);
      playlists.push(convertFormatNewPlaylist());
      finalSongList.splice(0,finalSongList.length)
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <div className="flex w-[645px] gap-6">
        <div className="relative flex flex-grow">
          <InpTextField
            type="full"
            placeholder="Please enter the song's name..."
            onChange={setSearchInput}
            className="flex-grow"
          />
          <Image className="absolute top-6 right-2" src={search} alt="" />
        </div>
      </div>
      {showDropdown && (
        <div className="h-[500px] bg-white flex flex-col gap-6 w-full overflow-auto">
          {songList.map((song, index) => (
            <PlaylistSongShowcase
              key={index}
              selectedSong={selectedSong}
              setSelectedSong={setSelectedSong}
              song={song}
            />
          ))}
        </div>
      )}
      {error && (
        <div className="absolute left-7 bottom-6 flex items-center size-[10px] leading-[15px] text-nowrap text-[10px]">
          <p className="text-[#FF4040]">Select at least one song</p>
        </div>
      )}
      <div className="absolute flex items-center bottom-[18px] right-[24px]">
        <div className=" ml-auto flex gap-2">
          <CaseActionButton
            className="bg-transparent border-none max-w-fit max-h-fit"
            text="Back"
            textClasses="!text-black text-[10px] leading-[15px]"
            onClick={() => setPage(1)}
            color="white"
          />
          <CaseActionButton
            className="!max-w-fit !max-h-fit"
            text="Save"
            color="orange"
            textClasses="text-[10px] leading-[15px]"
            onClick={saveSelectedSongs}
          />
        </div>
      </div>
    </div>
  );
}
