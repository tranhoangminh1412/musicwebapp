"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { _headerCategories } from "@/constants/categories.contant";
import { useUserProfileContext } from "@/contexts/ProfileContext";
import { useTrans } from "@/hooks/useTrans";

import { DROP_DOWN_1, DROP_DOWN_2 } from "@/constants/headerDropDown.constant";

import Link from "next/link";
import Image from "next/image";

import BtnLog from "@/components/share/BtnLog/BtnLog";
import Avatar from "@/components/share/Avatar/Avatar";
import { DropdownMenu, Button, Text } from "@radix-ui/themes";

import IcSearch from "@/assets/icons/IcSearch";
import IcLogo from "@/assets/icons/IcLogo";

import logoDark from "@/assets/app/logo-full-dark-theme.png";
import amongUs from "@/assets/app/default-avatar.png";

import styles from "./Layout.module.scss";
import { usePopupsContext } from "@/contexts/PopupsContext";

export interface IGlobalHeaderProps {
  className?: string;
}

export default function GlobalHeader(props: IGlobalHeaderProps) {
  const { className } = props;

  const router = useRouter();
  const t = useTrans("header");

  const { profile, setProfile } = useUserProfileContext();
  const { openingPopup, setOpeningPopup } = usePopupsContext();
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [token, setToken] = useLocalStorage("js4ever_token", "");

  const handleClickAvatar = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (openingPopup) {
      setOpeningPopup('');
    } else {
      setOpeningPopup('header-drop-down');
    }
  }

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(!!window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    setOpeningPopup('');
  }, [profile]);

  return (
    <header
      className={`sticky top-0 px-10 flex items-center z-[12] ${styles["header"]
        } ${className} ${isScrolling ? "bg-[#0e0c15ED]" : ""}`}
      style={{
        height: 56,
        transition: "all 0.1s ease-in-out",
      }}
    >
      <Link onClick={() => router.push("/")} href="/">
        <IcLogo/>
      </Link>

      <div className="ml-auto">
        {!profile ? (
          <BtnLog onClick={() => router.push("/auth/login")}>{t.login}</BtnLog>
        ) : (
          <div className="flex items-center">
            <div className="flex gap-7">
              <div className="search relative w-[256px] h-9 flex items-center">
                <div className="absolute left-3">
                  <IcSearch />
                </div>
                <input
                  type="text"
                  className={`${styles["input-search"]} bg-transparent outline-0 rounded-xl w-full h-full pl-12 text-sm text-[#ADA8C3]`}
                  placeholder={t["search"]}
                />
                <span className="absolute right-2 rounded-md bg-[#29282F] h-6 flex items-center px-2 text-[#E8ECEF] text-[10px] tracking-wider font-bold font-[Inter]">
                  ⌘ K
                </span>
              </div>
              {/* <div className="relative">
                {openingPopup === 'header-drop-down' && (
                  <div className="flex flex-col p-[5px] text-[#ADA8C3] items-center text-sm absolute top-[115%] right-0 bg-[#15131D] rounded-md font-inter">
                    {DROP_DOWN_1.map((option) => (
                      <div
                        className="flex items-center gap-2 px-2 py-[6px] w-[214px] cursor-pointer rounded hover:bg-[#75718530]"
                        key={option.id}
                      >
                        <div className="min-w-[16px]">{option.ic_primary}</div>
                        <span className="font-bold w-full">{option.label}</span>
                        <div className="min-w-[33px]">
                          {option.ic_secondary}
                        </div>
                      </div>
                    ))}
                    <div className="h-[1px] w-full bg-[#29282F] my-1"></div>
                    {DROP_DOWN_2.map((option) => (
                      <div
                        className="flex items-center gap-2 px-2 py-[6px] w-[214px] cursor-pointer rounded-md hover:bg-[#75718530]"
                        key={option.id}
                        onClick={() => {
                          option.navigate_to && router.push(option.navigate_to);
                        }}
                      >
                        <div className="min-w-[16px]">{option.ic_primary}</div>
                        <span className="font-bold w-full">{option.label}</span>
                        <div className="min-w-[33px]">
                          {option.ic_secondary}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div> */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <div>
                    <Avatar
                      onClick={(event) => handleClickAvatar(event)}
                      src={profile?.avatarUrl || amongUs.src}
                      width={36}
                      height={36}
                    />
                  </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content color="purple">
                  <DropdownMenu.Item shortcut="⌘⇧B︎">Profile</DropdownMenu.Item>
                  <DropdownMenu.Item shortcut="⌘⇧B︎">Settings</DropdownMenu.Item>
                  <DropdownMenu.Item shortcut="⌘⇧B︎">Keyboard shortcuts</DropdownMenu.Item>

                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>Logout</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
