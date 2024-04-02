'use client';

import * as React from "react";
import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import InpTextField from "@/components/share/InpTextField/InpTextField";
import CaseActionButton from "@/components/share/CaseActionBtn/CaseActionBtn";

import camera from "@/assets/app/camera.svg";
import dropdownArrow from "@/assets/app/angle-down.svg";

import { genres } from "@/constants/genres.constant";

export interface ICreatePlaylist1Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreatePlaylist1(props: ICreatePlaylist1Props) {
  const { setPage } = props;
  const router = useRouter();

  const [genre, setGenre] = useState("None");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
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
            <InpTextField className="w-auto" type="full" onChange={() => {}} />
          </div>
          <div>
            <div className="flex items-center size-[10px] leading-[15px] text-[10px]">
              <p>Slug </p>
              <p className="text-[#FF4040]"> *</p>
            </div>
            <InpTextField className="w-auto" type="full" onChange={() => {}} />
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
            onClick={()=>router.push('/home')}
          />
          <CaseActionButton
            className="!max-w-fit !max-h-fit"
            text="Next"
            color="orange"
            textClasses="text-[10px] leading-[15px]"
            onClick={() => setPage(2)}
          />
        </div>
      </div>
    </div>
  );
}
