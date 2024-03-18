"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { useUserProfileContext } from "@/contexts/ProfileContext";

import CaseActionButton from "../share/CaseActionBtn/CaseActionBtn";

import Avatar from "../share/Avatar/Avatar";
import IcSearch from "@/assets/icons/IcSearch";
import IcLogo from "@/assets/icons/IcLogo";

export interface IGlobalHeaderProps {
  className?: string;
}

export default function GlobalHeader(props: IGlobalHeaderProps) {
  const { className } = props;

  const router = useRouter();

  const { profile, setProfile } = useUserProfileContext();

  const handleClickAvatar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <header
      className={`sticky top-0 px-10 flex items-center z-[12] h-[80px] bg-[#2B2B2B] justify-center gap-[200px] ${className}`}
      suppressHydrationWarning = {true}
    >
      <Link onClick={() => router.push("/")} href="/">
        <IcLogo />
      </Link>

      <div className=" relative rounded-md w-[450px] h-[46px] flex items-center">
        <input
          type="text"
          className={` outline-1 outline-gray-400 pl-[14px] rounded-xl w-full h-full text-sm placeholder-[#ADA8C3]`}
          placeholder="Please enter a playlist's name.."
        />
        <div className="absolute right-3">
          <IcSearch />
        </div>
      </div>

      <div>
        {!profile ? (
          <div className="flex gap-3">
            <CaseActionButton
              text="Sign In"
              color="white"
              onClick={() => router.push("/auth/login") }
            />
            <CaseActionButton
              text="Sign Up"
              color="orange"
              onClick={() => router.push("/auth/register")}
            />
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex gap-7"> 
              <div>
                <Avatar
                  onClick={(event) => handleClickAvatar(event)}
                  src={profile.avatarUrl}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          </div>
        )
      }
      </div>
    </header>
  );
}
