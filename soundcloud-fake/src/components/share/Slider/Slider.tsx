"use client";

import * as React from "react";

export interface ISliderProps {
  bgColor?: string;
  inputClasses?: string;
  progressSliderClasses?: string;
  rounded?: boolean;
  size: string;
}

export default function Slider(props: ISliderProps) {
  const {
    bgColor,
    inputClasses,
    rounded = false,
    progressSliderClasses,
    size,
  } = props;

  const [sliderProgress, setSliderProgress] = React.useState<String>("0");

  const rangeClasses = `bg-${bgColor ? `[${bgColor}]` : `[#DCDCDC]`} ${
    rounded && "rounded-[2px]"
  } ${inputClasses}`;

  return (
    <div
      id="slider-container"
      className={`w-full z-30 flex items-center relative bg-[#DCDCDC] ${size == "L" ? 'h-2' : size == "M" ? 'h-1' : 'h-[2px]'} ${rounded && 'rounded-[2px]'} `}
    >
      <div
        id="progress-slider"
        style={{ width: `${sliderProgress}%` }}
        className={`absolute top-0 left-0 bg-[#FF6B00] h-2 pointer-events-none ${
          rounded && "rounded-[2px]"
        } ${progressSliderClasses}`}
      ></div>
      <input
        type="range"
        step={0.01}
        className={`w-full appearance-none ${rangeClasses} slider${size} cursor-pointer`}
        onChange={(e) => {
          setSliderProgress(e.target.value);
          console.log(e.target.value);
        }}
      />
    </div>
  );
}
