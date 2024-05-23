"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useCurrentPlayingContext } from "@/contexts/CurrentPlayingContext";
import { useUserProfileContext } from "@/contexts/ProfileContext";

import Slider from "../share/Slider/Slider";

import arrowLeft from "@/assets/app/FooterArrowLeftDark.svg";
import arrowRight from "@/assets/app/FooterArrowRightDark.svg";
import play from "@/assets/app/FooterPlay.svg";
import volume from "@/assets/app/FooterVolume.svg";
import heart from "@/assets/app/FooterHeart.svg";
import queueImage from "@/assets/app/FooterQueue.svg";

import { ISong } from "@/types/ISong";
import { IResSongs } from "@/types/res.type";
import { auth, getFirebaseImage } from "@/firebaseConfig";

const { app } = require("@/firebaseConfig");
import { useSongProgressContext } from "@/contexts/SongProgressContext";
import { useSongContext } from "@/contexts/SongContext";
import { formattedTime } from "@/utils/audioFunctions";
import { onAuthStateChanged } from "firebase/auth";
import { getSongs } from "@/utils/getDataFromFirebase";

export interface IGlobalFooterProps {}

let l: number;
let interv: number = 0;

export default function GlobalFooter(props: IGlobalFooterProps) {
  const { current, setCurrent } = useCurrentPlayingContext();
  const { profile, setProfile } = useUserProfileContext();
  const { progress, setProgress } = useSongProgressContext();
  const { currentSong, setCurrentSong } = useSongContext();
  const [songs, setSongs] = React.useState<ISong[]>([]);
  const [img, setImg] = React.useState<string>();
  const [currentTime, setCurrentTime] = React.useState("--:--");
  const [duration, setDuration] = React.useState("--:--");
  const [received, setReceived] = React.useState(false);
  const [traverse, setTraverse] = React.useState<boolean>(false);
  const [repeat, setRepeat] = React.useState(false);

  const router = useRouter();

  if(!profile && currentSong && current){
    currentSong.pause()
    setCurrentSong(null)
    setCurrent([])
    setProgress(0)
    clearInterval(l)
    interv = 0
  }

  /////////////////////////////////////////////
  
  React.useEffect(() => {
    getSongs(setSongs)
  }, [profile]);
  React.useEffect(() => {
    if (songs && current && current.length > 0 && songs.length > 0) {
      getFirebaseImage(songs[current[0]].image, setImg)
        .then(() => {
          setImg(img);
        })
        .catch((error) => {
          console.log("Error fetching Firebase Image. Error: " + error);
        });
    }
  }, [current, img]);
  ///////////////////////////////////////////// Getting data from Firebase

  React.useEffect(() => {
    if (currentSong && currentSong.audio.currentTime == 0) {
      currentSong.audio.onloadedmetadata = () => {
        l = window.setInterval(() => {
          setCurrentTime(
            formattedTime(Math.floor(currentSong?.audio.currentTime))
          );
          interv++;
        }, 1000);

        setDuration(formattedTime(Math.floor(currentSong?.audio.duration)));
        setReceived(true);
        currentSong.play();
      };
      
    }
    
  }, [currentSong]);

  
  ///////////////////////////////////////////// Initial Render / Current Song Change

  React.useEffect(() => {
    setProgress(interv);
  }, [interv]);

  if (traverse && progress != null) {
    interv = progress;
    let n = progress;
    clearInterval(l);
    l = window.setInterval(() => {
      setCurrentTime(formattedTime(n));
      interv++;
      n++;
    }, 1000);
    currentSong?.traverse(progress);
    setTraverse(false);
  }

  ///////////////////////////////////////////// Song Playing Logic

  React.useEffect(() => {
    if (currentTime == duration && currentTime != "--:--") {
      clearInterval(l);
      if(!repeat && current){
        interv=0;
        setCurrent([...current.slice(1)])        
      }
    }
  }, [currentTime]);
  ///////////////////////////////////////////// Clear Interval when currentTime = duration

  return (
    <>
      {received &&
      current &&
      current.length > 0 &&
      progress != null &&
      currentSong &&
      profile ? (
        <div className="sticky z-50 h-[72px] w-full bottom-[0px] border-t-[1px] flex align-middle items-center bg-[#F6F6F6] border-[#DCDCDC] justify-center">
          <div className="flex gap-[10px] ">
            <div className="flex gap-6 items-center z-30 py-[10px] px-4">
              <Image
                src={arrowLeft}
                alt=""
                onClick={() => {
                  currentSong?.traverse(0);
                  setCurrentTime(formattedTime(Math.floor(0)));
                  clearInterval(l);
                  setProgress(0);
                  currentSong.pause();
                }}
                className="cursor-pointer"
              />
              <Image
                src={play}
                alt=""
                onClick={() => {
                  if (currentSong?.audio.paused) {
                    let n = progress;
                    interv = progress;
                    clearInterval(l);
                    l = window.setInterval(() => {
                      setCurrentTime(formattedTime(n));
                      interv++;
                      n++;
                    }, 1000);
                    currentSong.play();
                  } else {
                    currentSong?.pause();
                    clearInterval(l);
                  }
                }}
                className="cursor-pointer"
              />
              <Image
                src={arrowRight}
                alt=""
                onClick={() => {
                  currentSong?.traverse(currentSong.audio.duration);
                  clearInterval(l);
                  setCurrentTime(
                    formattedTime(Math.floor(currentSong.audio.duration))
                  );
                  setProgress(Math.floor(currentSong.audio.duration));
                }}
                className="cursor-pointer"
              />
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  currentSong.loop();
                  setRepeat(!repeat);
                }}
                className="cursor-pointer"
              >
                <g clipPath="url(#clip0_79_2920)">
                  <path
                    d="M7 7H17V10L21 6L17 2V5H5V11H7V7ZM17 17H7V14L3 18L7 22V19H19V13H17V17Z"
                    fill={!repeat ? "#0F0F0F" : "#FF6B00"}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_79_2920">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div className="flex text-xs leading-[18px] text-[#FF6B00] items-center gap-3 w-[589px] text-nowrap">
                <p className="w-[30px]">
                  {received
                    ? currentTime != duration
                      ? currentTime
                      : duration
                    : "--:--"}
                </p>
                <Slider
                  inputClasses="!h-[4px]"
                  progressSliderClasses="!h-[4px]"
                  rounded={true}
                  parentProgress={progress}
                  size="S"
                  type="song"
                  setParentProgress={setProgress}
                  duration={currentSong?.audio.duration}
                  traverse={setTraverse}
                />
                <p className="text-[#979797] text-nowrap">
                  {received ? duration : "--:--"}
                </p>
              </div>
              <Image className="size-[20px]" src={volume} alt="" />

              <div className="border-l-[1px] border-[#DCDCDC] h-[64px] pl-6 flex gap-[14px] items-center">
                {img && (
                  <Image
                    objectFit="cover"
                    className="rounded-full size-[46px]"
                    width={46}
                    height={46}
                    src={img}
                    alt=""
                  />
                )}
                <div>
                  <p className=" leading-[18px] text-[#979797] hover:text-stone-300 cursor-pointer">
                    {songs && current[0] != null
                      ? songs[current[0]].artist
                      : "Unknown Artist"}
                  </p>
                  <p
                    className="leading-[21px] text-[#0F0F0F] text-ellipsis cursor-pointer hover:text-stone-300"
                    onClick={() => router.push("/home/song")}
                  >
                    {songs && current[0] != null
                      ? songs[current[0]].name
                      : "Current Song"}
                  </p>
                </div>
              </div>
              <Image src={heart} alt="" />
              <Image src={queueImage} alt="" />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
