import * as React from "react";
import Image from "next/image";

import { comments } from "@/constants/comments.constant";
import { users } from "@/constants/users.constant";
import { playlists } from "@/constants/playlists.constant";

import { IPlaylist } from "@/types/IPlaylist";
import { ISong } from "@/types/ISong";

import { getPlaylistAuthor } from "@/utils/getPlaylistAuthor";

import { useUserProfileContext } from "@/contexts/ProfileContext";

import caretDown from "@/assets/app/caret-down.svg";
import SongViewComments from "./PlaylistComments";
import { getFirebaseImage } from "@/firebaseConfig";

export interface ISongViewInfoProps {
  song: ISong;
}

export default function SongViewInfo(props: ISongViewInfoProps) {
  const { song } = props;

  const [descShow, setDescShow] = React.useState(false);
  const {profile,setProfile} = useUserProfileContext();
  const [img, setImg] = React.useState<string>();

  React.useEffect(() => {
    getFirebaseImage(song.image, setImg);
  }, []);

  return (
    <div className="flex gap-6 items-start">
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="rounded-full border p-2 w-[174px]">
          {/* {img && <Image
            className="size-[158px] rounded-full object-cover"
            objectFit="cover"˝
            width={158}
            height={158}
            src={img}
            alt=""
          />} */}
          <img
            className="size-[158px] rounded-full object-cover"
            src={profile?.avatarUrl}
            alt=""
          ></img>
        </div>
        <p className="text-[20px] leading-[30px] text-wrap">{profile?.name}</p>
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
            {song.description}
            <br></br>
            Link to playlist:{" "}
            <a className="cursor-pointer text-linkBLue">{`http://localhost:3000/${song.id}`}</a>
          </p>
          <div
            className="text-xs leading-[18px] text-[#979797] flex"
            onClick={() => setDescShow(!descShow)}
          >
            {descShow ? "Show less" : "Show more"}
            <Image src={caretDown} alt="" />
          </div>
        </div>
        <SongViewComments song={song} />
      </div>
    </div>
  );
}
