import * as React from "react";
import Image from "next/image";

import InpTextField from "../share/InpTextField/InpTextField";
import CaseActionButton from "../share/CaseActionBtn/CaseActionBtn";

import search from "../../assets/app/search.svg";

import { songs } from "@/constants/songs.constant";
import PlaylistSongShowcase from "./PlaylistSongShowcase";
import { ISong } from "@/types/ISong";
import { PlaylistInfo } from "@/types/IPlaylistInfo";

export interface ICreatePlaylist2Props {
  setList: React.Dispatch<React.SetStateAction<ISong[] | undefined>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  updatePlaylistInfo: (key: keyof PlaylistInfo, value: string | string[]) => void;
}

export default function CreatePlaylist2(props: ICreatePlaylist2Props) {
  const { setList, setPage, updatePlaylistInfo } = props;

  const [showDropdown, setShowDropdown] = React.useState(true);
  const [selectedSong, setSelectedSong] = React.useState<ISong>();
  const [searchInput, setSearchInput] = React.useState<string>();
  const [songList, setSongList] = React.useState([...songs]);
  const [error, setError] = React.useState(false);
  let finalSongList: ISong[] = [];

  React.useEffect(() => {
    let i = finalSongList.findIndex((song) => song == selectedSong);
    if (i != -1) {
      finalSongList.splice(i, 1);
    } else {
      selectedSong && finalSongList.push(selectedSong);
    }
  }, [selectedSong]);

  React.useEffect(() => {
    console.log("matching... searchInput changed");
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

  const saveSelectedSongs = () => {
    if (checkSongList()) {
      setList([...finalSongList]);
      setPage(3);
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
              setSelectedSong={setSelectedSong}
              song={song}
            />
          ))}
        </div>
      )}
      {error && <div className="absolute left-7 bottom-6 flex items-center size-[10px] leading-[15px] text-nowrap text-[10px]">
        <p className="text-[#FF4040]">Select at least one song</p>
      </div>}
      <div className="absolute flex items-center bottom-[18px] right-[24px]">
        <div className=" ml-auto flex gap-2">
          <CaseActionButton
            className="bg-transparent border-none max-w-fit max-h-fit"
            text="Back"
            textClasses="!text-black text-[10px] leading-[15px]"
            onClick={() => setPage(1)}
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
