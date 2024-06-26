"use client";

import * as React from "react";

import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useUserProfileContext } from "@/contexts/ProfileContext";
import { useAuthContext } from "@/contexts/AuthContext";

import CaseActionButton from "../share/CaseActionBtn/CaseActionBtn";

import Avatar from "../share/Avatar/Avatar";
import IcSearch from "@/assets/icons/IcSearch";
import IcLogo from "@/assets/icons/IcLogo";
import addPlaylist from "@/assets/app/addPlaylist.svg";

import { getAuth, onAuthStateChanged } from "firebase/auth";
const { app } = require("@/firebaseConfig");
import { auth } from "@/firebaseConfig";

import { signOut } from "firebase/auth";
import { useSongContext } from "@/contexts/SongContext";
import { useCurrentPlayingContext } from "@/contexts/CurrentPlayingContext";

export interface IGlobalHeaderProps {
  className?: string;
}

export default function GlobalHeader(props: IGlobalHeaderProps) {
  const { className } = props;
  const clientId =
    "752827926431-6n24u15f6k9al524t0j9hpa2bi24f4f9.apps.googleusercontent.com";

  // const oauth2Client = new OAuth2Client({
  //   clientId: clientId,
  //   clientSecret: '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',
  //   redirectUri: 'http://localhost:3000/home',
  // });

  const router = useRouter();

  const { profile, setProfile } = useUserProfileContext();
  const { authenticated, setAuthenticated } = useAuthContext();
  const {currentSong,setCurrentSong} = useSongContext()
  const {current,setCurrent} = useCurrentPlayingContext()

  const handleClickAvatar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  const onLogoutSuccess = () => {
    setProfile(null);
    setAuthenticated(false);
    router.push("/auth/login");
  };

  async function googleLogout() {
    signOut(auth)
      .then(() => {
        onLogoutSuccess();
        console.log("Logout successful");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setProfile({
          id: user.uid,
          email: user.email,
          fullname: user.displayName,
          password: "",
          avatarUrl: user.photoURL,
        });
        setAuthenticated(true);
      } else {
        router.push("/auth/login");
      }
    });
  }, []);

  React.useEffect(() => {
    if (profile) {
      setAuthenticated(true);
    }
    else{
      setAuthenticated(false)
    }
  }, []);

  return (
    <header
      className={`sticky top-0 px-10 flex items-center z-[100] h-[80px] bg-[#2B2B2B] justify-center gap-[200px] ${className}`}
      suppressHydrationWarning={true}
    >
      <Link onClick={() => router.push("/home")} href="/home">
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
        {!authenticated ? (
          <div className="flex gap-3">
            <CaseActionButton
              text="Sign In"
              color="white"
              onClick={() => router.push("/auth/login")}
            />
            <CaseActionButton
              text="Sign Up"
              color="orange"
              onClick={() => router.push("/auth/register")}
            />
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex gap-7 items-center">
              <CaseActionButton
                color="white"
                label={addPlaylist}
                text="Create Playlist"
                onClick={() => router.push("/home/createplaylist")}
              />
              <div className="w-9 h-9">
                <Avatar
                  onClick={(event) => handleClickAvatar(event)}
                  src={profile?.avatarUrl}
                  width={36}
                  height={36}
                />
              </div>
              {/* <div id="logOutButton">
                <GoogleLogout clientId={clientId} buttonText={"Logout"} onLogoutSuccess={onLogoutSuccess} />
              </div> */}
              <CaseActionButton
                color="orange"
                text="Logout"
                className="h-9"
                onClick={googleLogout}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
