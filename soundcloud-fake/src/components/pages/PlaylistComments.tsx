import { IPlaylist } from "@/types/IPlaylist";
import * as React from "react";
import Image from "next/image";

import commentSVG from "@/assets/app/comment-alt.svg";
import defaultAva from "@/assets/app/765-default-avatar.png";

import { comments } from "@/constants/comments.constant";

import CaseActionButton from "../share/CaseActionBtn/CaseActionBtn";
import InpTextField from "../share/InpTextField/InpTextField";
import Comment from "../share/Comment/Comment";
import ListPages from "../share/ListPages/ListPages";
import { generateAuthToken } from "@/utils/auth";

generateAuthToken("0");

export interface ISongViewCommentsProps {
  playlist: IPlaylist;
}

export default function SongViewComments(props: ISongViewCommentsProps) {
  const { playlist } = props;

  const [sort, setSort] = React.useState("Newest");
  const [show, setShow] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("Loading..");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (event.metaKey || event.ctrlKey) &&
      event.key === "Enter" &&
      input.trim() != ""
    ) {
      comments[playlist.id].contents.push({
        id:
          comments[playlist.id].contents[
            comments[playlist.id].contents.length - 1
          ].id + 1,
        authorId: 0,
        content: input,
      });
      console.log("why");
      setInput("");
    }
  };

  React.useEffect(() => {
    console.log("useeffect songView inputVal : " + input);
    if (input.length > 250) {
      setError(true);
    } else {
      setError(false);
    }
  }, [input]);

  let showSongIndex = 0;
  let maxSongShowcase = 5;

  let numLikedPages = Math.floor(
    comments[playlist.id].contents.length / maxSongShowcase
  );
  if (comments[playlist.id].contents.length % maxSongShowcase != 0)
    numLikedPages += 1;

  let angleDownSVG = (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.60151 8.25703L2.41401 5.06953C2.1937 4.84922 2.1937 4.49297 2.41401 4.275L2.9437 3.74531C3.16401 3.525 3.52026 3.525 3.73823 3.74531L5.99761 6.00469L8.25698 3.74531C8.47729 3.525 8.83354 3.525 9.05151 3.74531L9.5812 4.275C9.80151 4.49531 9.80151 4.85156 9.5812 5.06953L6.3937 8.25703C6.17808 8.47734 5.82183 8.47734 5.60151 8.25703Z"
        fill="#FF6B00"
      />
    </svg>
  );

//   React.useEffect(() => {
//     fetch("http://localhost:3000/api/home")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setMessage(data.message);
//       });
//   }, []);

  return (
    <>
      <div className="flex items-center w-full h-38px">
        {/* {message} */}
        <div className="text-[#979797] text-xs leading-[18px] flex-grow flex items-center">
          <Image className="size-3" src={commentSVG} alt="" /> &nbsp;
          {comments[playlist.id].contents.length} comments
        </div>
        <div
          className="relative"
          onBlur={() => {
            setTimeout(() => setShow(false), 100);
          }}
        >
          <CaseActionButton
            text={`Sorted by: ${sort}`}
            color="black"
            textClasses="!text-[#FF6B00] !text-xs !leading-[18px]"
            className="!border-[#FF6B00] !h-[26px] !px-2 !py-1"
            labelSVG={angleDownSVG}
            onClick={() => setShow(!show)}
          />
          {show && (
            <div className="w-fit flex flex-col absolute right-0 bottom-[-40px]">
              <div
                className={`bg-white h-[20px] px-1 ${
                  sort == "Newest" && "!text-[#FF6B00]"
                } text-[#979797] text-center border hover:bg-slate-100 text-xs leading-[18px]`}
                onClick={() => setSort("Newest")}
              >
                Newest
              </div>
              <div
                className={`bg-white h-[20px] px-1 ${
                  sort == "Oldest" && "!text-[#FF6B00]"
                } text-[#979797] text-center  border hover:bg-slate-100 text-xs leading-[18px]`}
                onClick={() => setSort("Oldest")}
              >
                Oldest
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full border-y border-[#DCDCDC] p-2 rounded-[4px] bg-[#F6F6F6]">
        <div className=" flex gap-2 items-center w-full">
          <InpTextField
            className="flex-grow bg-white"
            inputClasses="break-all resize-x"
            placeholder="Write a comment"
            onChange={setInput}
            type="full"
            field="yes"
            maxLength={250}
            error={error}
            textAllowContinue={true}
            handleKeyDown={handleKeyDown}
            value={input}
          />
          <Image className="size-[40px] rounded-full" src={defaultAva} alt="" />
        </div>
        {error && (
          <p className="text-[10px] leading-[15px] text-[#FF4040] mt-1">
            Comment is too long (max 250 characters)
          </p>
        )}
      </div>
      <div className="flex flex-col gap-6 items-center w-full">
        {comments[playlist.id].contents.map((content) => {
          if (
            showSongIndex < maxSongShowcase &&
            content.id < currentPage * maxSongShowcase &&
            content.id > (currentPage - 1) * maxSongShowcase - 1
          ) {
            showSongIndex += 1;
            return <Comment contents={content} />;
          }
        })}
      </div>
      <div className="ml-auto">
        <ListPages
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numPages={numLikedPages}
        />
      </div>
    </>
  );
}
