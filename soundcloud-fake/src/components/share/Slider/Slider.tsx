"use client";

import * as React from "react";

import { useSongProgressContext } from "@/contexts/SongProgressContext";
import { log } from "console";

export interface ISliderProps {
  bgColor?: string;
  inputClasses?: string;
  progressSliderClasses?: string;
  rounded?: boolean;
  size: string;
  parentProgress?: number;
  type?: string;
  setParentProgress?: any;
  duration? : number
  traverse?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Slider(props: ISliderProps) {
  const {
    bgColor,
    inputClasses,
    rounded = false,
    progressSliderClasses,
    size,
    parentProgress = 0,
    type,
    setParentProgress,
    duration = 0,
    traverse = ()=>{},
  } = props;

  const [sliderProgress, setSliderProgress] = React.useState<number>(0);

  const rangeClasses = `bg-${bgColor ? `[${bgColor}]` : `[#DCDCDC]`} ${
    rounded && "rounded-[2px]"
  } ${inputClasses}`;

  let thisRef: React.LegacyRef<HTMLInputElement> | undefined;

  React.useEffect(() => {
    if (type == "song") {
      setSliderProgress(parentProgress);
    }
  }, [parentProgress]);

  return (
    <div
      id="slider-container"
      className={`w-full z-30 flex items-center relative bg-[#DCDCDC] ${
        size == "L" ? "h-2" : size == "M" ? "h-1" : "h-[2px]"
      } ${rounded && "rounded-[2px]"} `}
    >
      {/* <div>parentProgress {parentProgress}</div> */}
      <div
        id="progress-slider"
        style={{ width: `${type == "song" ? (parentProgress/duration)*100+0.2 : sliderProgress}%` }}
        className={`absolute top-0 left-0 bg-[#FF6B00] h-2 pointer-events-none ${
          rounded && "rounded-[2px]"
        } ${progressSliderClasses}`}
      ></div>
      <input

        ref={thisRef}
        type="range"
        max={!Number.isNaN(duration) ? duration : undefined}
        className={`w-full appearance-none ${rangeClasses} slider${size} cursor-pointer`}
        onChange={(e) => {
          setSliderProgress(parseFloat(e.target.value));
          if (type == "song") {
            traverse(true)
            setParentProgress(parseFloat(e.target.value));
          }
        }}
        value={type == "song" ? parentProgress : sliderProgress}
      />
    </div>
  );
}
