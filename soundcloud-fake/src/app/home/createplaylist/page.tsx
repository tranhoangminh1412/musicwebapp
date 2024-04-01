"use client";

import CreatePlaylistProgress from "@/components/share/CreatePlaylistProgress/CreatePlaylistProgress";
import camera from "@/assets/app/camera.svg";
import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { genres } from "@/constants/genres.constant";
import dropdownArrow from "@/assets/app/angle-down.svg";

import InpTextField from "@/components/share/InpTextField/InpTextField";
import CaseActionButton from "@/components/share/CaseActionBtn/CaseActionBtn";

export interface ICreatePlaylistProps {}

export default function CreatePlaylist(props: ICreatePlaylistProps) {
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("None");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex items-center justify-center my-[110px] mx-[260px]">
      <div className="flex gap-[31px] flex-col w-[1400px] content-center items-center">
        <h1 className="font-bold text-4xl leading-[54px] h-[54px]">
          Create new Playlist
        </h1>
        <CreatePlaylistProgress page={page} setPage={setPage} />
        <div className="flex flex-col gap-6 rounded-[10px] border border-[#DCDCDC] px-6 pt-[32px] pb-[18px]">
          <div className="flex w-[645px] gap-6">
            <div className="relative bg-gradient-to-br from-red-500 to-blue-500 size-[200px] rounded-[4px]">
              <button className="absolute items-center justify-center flex top-[162px] left-[44px] gap-1 w-[111px] px-1 py-[2px] bg-[#F6F6F6]">
                <Image src={camera} alt="" />
                <div className="text-nowrap text-[10px] leading-[15px]">
                  Upload Image
                </div>
              </button>
            </div>
            <div className="relative flex-grow">
              <div>
                <div className="flex items-center size-[10px] leading-[15px] text-[10px]">
                  <p>Title </p>
                  <p className="text-[#FF4040]">*</p>
                </div>
                <InpTextField
                  className="w-auto"
                  type="full"
                  onChange={() => {}}
                />
              </div>
              <div>
                <div className="flex items-center size-[10px] leading-[15px] text-[10px]">
                  <p>Slug </p>
                  <p className="text-[#FF4040]"> *</p>
                </div>
                <InpTextField
                  className="w-auto"
                  type="full"
                  onChange={() => {}}
                />
              </div>
              <div className="flex gap-4">
                <div
                  className="w-[50%]"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="flex items-center size-[10px] leading-[15px] text-[10px]">
                    <p>Genre </p>
                    <p className="text-[#FF4040]"> *</p>
                  </div>
                  <div
                    className={`input-textfield__box flex items-center py-4 relative `}
                    style={{ transition: "all .35s ease" }}
                  >
                    <div className="relative text-gray bg-transparent border-[#DCDCDC] border rounded outline-none text-sm py-2 pl-1 w-full text-[10px] leading-[15px]">
                      {genre}
                      <div className="absolute top-[30%] right-[2px]">
                        <Image src={dropdownArrow} alt="" />
                      </div>
                    </div>
                    <div
                      className={`absolute top-[72%] flex flex-col bg-white w-full border-[#DCDCDC] border rounded border-t-0`}
                    >
                      {showDropdown &&
                        genres.map((item, index) => (
                          <div
                            onClick={() => {
                              setGenre(item);
                              setShowDropdown(false);
                            }}
                            className="text-sm py-1 pl-1 w-full hover:bg-slate-100"
                          >
                            {item}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="w-[50%]">
                  <div className="flex items-center size-[10px] leading-[15px] text-[10px]">
                    <p>Slug </p>
                    <p className="text-[#FF4040]"> *</p>
                  </div>
                  <InpTextField
                    className="w-auto"
                    type="full"
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center size-[10px] leading-[15px] text-[10px]">
                  <p>Description </p>
                  <p className="text-[#FF4040]">*</p>
                </div>
                <InpTextField
                  className="w-auto"
                  placeholder="Describe your track"
                  field="yes"
                  type="full"
                  onChange={() => {}}
                  maxLength={500}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center size-[10px] leading-[15px] text-nowrap text-[10px]">
              <p>Required Fields </p>
              <p className="text-[#FF4040]">*</p>
            </div>
            <div className=" ml-auto flex gap-2">
              <CaseActionButton
                className="bg-transparent border-none max-w-fit max-h-fit"
                text="Cancel"
                textClasses="!text-black text-[10px] leading-[15px]"
              />
              <CaseActionButton className="!max-w-fit !max-h-fit" text="Next" color="orange" textClasses="text-[10px] leading-[15px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
