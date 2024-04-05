import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

import { ISong } from "@/types/ISong";
import { PlaylistInfo } from "@/types/IPlaylistInfo";

import InpTextField from "../share/InpTextField/InpTextField";
import CaseActionButton from "../share/CaseActionBtn/CaseActionBtn";

import copy from '@/assets/app/copy.svg'


export interface ICreatePlaylist3Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  updatePlaylistInfo: (
    key: keyof PlaylistInfo,
    value: string | number[] | StaticImageData
  ) => void;
  playlistInfo: PlaylistInfo;
}

export default function CreatePlaylist3(props: ICreatePlaylist3Props) {
  const { setPage,updatePlaylistInfo,playlistInfo } = props;

  const router = useRouter();

  const createAnotherPlaylist = () => {
    updatePlaylistInfo('artist',"")
    updatePlaylistInfo('title',"")
    updatePlaylistInfo('slug',"")
    updatePlaylistInfo('genre',"")
    updatePlaylistInfo('description',"")
    updatePlaylistInfo('img',"")
    setPage(1)
  }

  return (
      <div className="relative flex w-[645px] gap-6">
       <Image style={{objectFit:"cover"}} className="size-[120px] rounded-[4px]" src={playlistInfo.img} alt=""/>
       <div className="flex-grow">
        <div className="flex flex-col flex-grow gap-3">
            <p className="text-base font-medium text-[#0F0F0F]" >{playlistInfo.title}</p>
            <p className="text-xs">{playlistInfo.genre} {playlistInfo.genre && '•'} {playlistInfo.songs.length} tracks</p>
            <div className="flex gap-3">
                <div className="flex h-7 rounded-[4px] border justify-between px-2 bg-[#F6F6F6] border-[#DCDCDC] items-center flex-grow">
                    <a className="text-[10px] leading-[15px] text-[#0094FF] cursor-pointer">{`http://localhost:3000/${playlistInfo.slug}`}</a>
                    <Image objectFit="cover" className="size-[14px] cursor-pointer" src={copy} alt="" />
                </div>
                <CaseActionButton color="orange" text="Play now" textClasses="text-[10px] leading-[15px]" className="h-[28px]"  />
            </div>
        </div>
       </div>
        <div className="absolute bottom-[-82px] left-[30%] w-[250px] h-[30px] text-nowrap">
            <div className="size-[14px] leading-[21px] text-[#979797]">
                <a onClick={() => router.push('/home')} className="!text-[#0094FF]">Go Home </a> or <a onClick={createAnotherPlaylist} className="!text-[#0094FF]">Create another playlist</a>
            </div>
        </div>
      </div>
  );
}
