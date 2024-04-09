import * as React from "react";
import Image from "next/image";

import { comments } from "@/constants/comments.constant";
import { users } from "@/constants/users.constant";
import { playlists } from "@/constants/playlists.constant";

import { IPlaylist } from "@/types/IPlaylist";
import { ISong } from "@/types/ISong";

import { getPlaylistAuthor } from "@/utils/getPlaylistAuthor";

import caretDown from "@/assets/app/caret-down.svg";
import SongViewComments from "./PlaylistComments";

export interface ISongViewInfoProps {
  playlist: IPlaylist;
}

export default function SongViewInfo(props: ISongViewInfoProps) {
  const { playlist } = props;

  const [descShow, setDescShow] = React.useState(false);

  return (
    <div className="flex gap-6 items-start">
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="rounded-full border p-2">
          <Image
            className="size-[158px] rounded-full object-cover"
            src={playlist.image}
            alt=""
          />
        </div>
        <p className="text-[20px] leading-[30px]">{playlist.author}</p>
      </div>
      <div className="flex flex-col gap-6 items-start flex-grow">
        <div className="flex flex-col gap-6 items-start">
          <p
            className={
              descShow
                ? "text-base w-full h-fit"
                : "text-base w-full h-[72px] overflow-hidden"
            }
          >
            {playlist.description}
            <br></br>
            Link to playlist:{" "}
            <a className="cursor-pointer text-linkBLue">{`http://localhost:3000/${playlist.slug}`}</a>
          </p>
          <div
            className="text-xs leading-[18px] text-[#979797] flex"
            onClick={() => setDescShow(!descShow)}
          >
            {descShow ? "Show less" : "Show more"}
            <Image src={caretDown} alt="" />
          </div>
        </div>
        <SongViewComments playlist={playlist} />
      </div>
    </div>
  );
}
