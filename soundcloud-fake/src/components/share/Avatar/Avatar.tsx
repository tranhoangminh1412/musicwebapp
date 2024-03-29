"use client"

import * as React from "react";

import defaultAva from "@/assets/app/765-default-avatar.png"

import Image from "next/image";

export interface IAvatarProps {
  height: number;
  width: number;
  src?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function Avatar(props: IAvatarProps) {
  const { height, width, src, onClick } = props;

  return (
    <div
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }
      }}
      className="profile rounded-full border-[#232627] overflow-hidden cursor-pointer relative hover:scale-[1.03] hover:brightness-110"
    >
      <Image
        height={height}
        width={width}
        src={src || defaultAva}
        alt=""
        className="object-cover"
      />
    </div>
  );
}
