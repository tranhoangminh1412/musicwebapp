import * as React from "react";
import Image from "next/image";

import { ISong } from "@/types/ISong";

import playGray from "@/assets/app/playGray.svg";
import heart from "@/assets/app/heart.svg";

import CaseActionButton from "../CaseActionBtn/CaseActionBtn";

export interface ISongViewActionProps {
  song: ISong;
}

export default function SongViewAction(props: ISongViewActionProps) {
  const { song } = props;

  const [liked, setLiked] = React.useState(false);

  const like = () => {
    setLiked(!liked);
    if (liked) {
      song.likes -= 1;
    } else {
      song.likes += 1;
    }
  };

  let heartLabel = (
    <svg
      id="heart"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_79_2343)">
        <path
          d="M18.0586 2.44533C15.918 0.621109 12.7344 0.949234 10.7695 2.97658L9.99999 3.76955L9.23046 2.97658C7.26952 0.949234 4.08202 0.621109 1.9414 2.44533C-0.511728 4.53908 -0.640634 8.29689 1.55468 10.5664L9.11327 18.3711C9.60155 18.875 10.3945 18.875 10.8828 18.3711L18.4414 10.5664C20.6406 8.29689 20.5117 4.53908 18.0586 2.44533Z"
          fill={liked ? "#FF6B00" : "#0F0F0F"}
        />
      </g>
      <defs>
        <clipPath id="clip0_79_2343">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  let trashLabel = (
    <svg
      id="trash"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_844_157)">
        <path
          d="M1.5 10.875C1.5 11.1734 1.61853 11.4595 1.8295 11.6705C2.04048 11.8815 2.32663 12 2.625 12H9.375C9.67337 12 9.95952 11.8815 10.1705 11.6705C10.3815 11.4595 10.5 11.1734 10.5 10.875V3H1.5V10.875ZM7.875 4.875C7.875 4.77555 7.91451 4.68017 7.98483 4.60984C8.05516 4.53951 8.15054 4.5 8.25 4.5C8.34946 4.5 8.44484 4.53951 8.51517 4.60984C8.58549 4.68017 8.625 4.77555 8.625 4.875V10.125C8.625 10.2245 8.58549 10.3198 8.51517 10.3902C8.44484 10.4605 8.34946 10.5 8.25 10.5C8.15054 10.5 8.05516 10.4605 7.98483 10.3902C7.91451 10.3198 7.875 10.2245 7.875 10.125V4.875ZM5.625 4.875C5.625 4.77555 5.66451 4.68017 5.73484 4.60984C5.80516 4.53951 5.90054 4.5 6 4.5C6.09946 4.5 6.19484 4.53951 6.26516 4.60984C6.33549 4.68017 6.375 4.77555 6.375 4.875V10.125C6.375 10.2245 6.33549 10.3198 6.26516 10.3902C6.19484 10.4605 6.09946 10.5 6 10.5C5.90054 10.5 5.80516 10.4605 5.73484 10.3902C5.66451 10.3198 5.625 10.2245 5.625 10.125V4.875ZM3.375 4.875C3.375 4.77555 3.41451 4.68017 3.48484 4.60984C3.55516 4.53951 3.65054 4.5 3.75 4.5C3.84946 4.5 3.94484 4.53951 4.01516 4.60984C4.08549 4.68017 4.125 4.77555 4.125 4.875V10.125C4.125 10.2245 4.08549 10.3198 4.01516 10.3902C3.94484 10.4605 3.84946 10.5 3.75 10.5C3.65054 10.5 3.55516 10.4605 3.48484 10.3902C3.41451 10.3198 3.375 10.2245 3.375 10.125V4.875ZM10.875 0.750004H8.0625L7.84219 0.311723C7.79552 0.218023 7.72363 0.139205 7.63461 0.084135C7.54558 0.0290653 7.44296 -7.09679e-05 7.33828 4.10923e-06H4.65938C4.55493 -0.000397388 4.45249 0.0286302 4.36378 0.0837612C4.27508 0.138892 4.20369 0.217897 4.15781 0.311723L3.9375 0.750004H1.125C1.02554 0.750004 0.930161 0.789513 0.859835 0.859839C0.789509 0.930165 0.75 1.02555 0.75 1.125L0.75 1.875C0.75 1.97446 0.789509 2.06984 0.859835 2.14017C0.930161 2.2105 1.02554 2.25 1.125 2.25H10.875C10.9745 2.25 11.0698 2.2105 11.1402 2.14017C11.2105 2.06984 11.25 1.97446 11.25 1.875V1.125C11.25 1.02555 11.2105 0.930165 11.1402 0.859839C11.0698 0.789513 10.9745 0.750004 10.875 0.750004Z"
          fill="#FF4040"
        />
      </g>
      <defs>
        <clipPath id="clip0_844_157">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  let shareLabel = (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_844_153)">
        <path
          d="M11.8053 4.44928L7.68016 0.887133C7.31909 0.575297 6.75 0.828445 6.75 1.31285V3.18909C2.98526 3.2322 0 3.98672 0 7.55452C0 8.99454 0.92768 10.4211 1.95312 11.167C2.27311 11.3997 2.72916 11.1076 2.61117 10.7303C1.54842 7.33158 3.11524 6.42928 6.75 6.37699V8.4375C6.75 8.92266 7.31953 9.17468 7.68016 8.86322L11.8053 5.30072C12.0647 5.07661 12.0651 4.6737 11.8053 4.44928Z"
          fill="#0F0F0F"
        />
      </g>
      <defs>
        <clipPath id="clip0_844_153">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const heartButtonClasses = `!py-1 !px-[10px] size-max !gap-1 ${
    liked ? "hover:border-[#FF6B00]" : "hover:border-[#CCCCCC]"
  }`;

  return (
    <div className="flex justify-between">
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Image
            objectFit="cover"
            className="size-[12px]"
            src={playGray}
            alt=""
          />
          <p className="text-xs leading-[18px] text-[#979797]">{song.plays}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Image style={{objectFit:'cover'}} className="size-[12px]" src={heart} alt="" />
          <p className="text-xs leading-[18px] text-[#979797]">{song.likes}</p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <CaseActionButton
          color="black"
          textClasses="!text-black text-[12px] leading-[18px]"
          className={heartButtonClasses}
          text="Like"
          onClick={like}
          labelSVG={heartLabel}
        />
        <CaseActionButton
          color="black"
          textClasses="!text-black text-[12px] leading-[18px]"
          className="!py-1 !px-[10px] size-max hover:border-[#CCCCCC] !gap-1"
          text="Like"
          labelSVG={shareLabel}
        />
        <CaseActionButton
          color="red"
          labelSVG={trashLabel}
          className="!py-1 !px-[10px] size-max"
        />
      </div>
    </div>
  );
}
