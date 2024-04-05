import * as React from "react";

export interface ISliderProps {
  bgColor?: string;
  classes?: string;
  rounded?: boolean;
}

export default function Slider(props: ISliderProps) {
  const { bgColor, classes, rounded = true } = props;

  const rangeClasses = `bg-${bgColor ? `[${bgColor}]` : `[#DCDCDC]`} ${
    rounded && "rounded-[2px]"
  } ${classes}`;

  return (
    <div id="slider-container" className="w-full z-30 flex items-center gap-5 mt-8">
      <div id="progress-bar-cover"></div>
      <div id="thumb"></div>
      <input
        type="range"
        step={0.01}
        className={`w-full appearance-none ${rangeClasses}  `}
      />
    </div>
  );
}
