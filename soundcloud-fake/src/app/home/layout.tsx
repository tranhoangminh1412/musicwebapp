"use client";

import * as React from "react";
import axios from "axios";
import { useUserProfileContext } from "@/contexts/ProfileContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const { app } = require("@/firebaseConfig");
import { auth, getFirebaseFile } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { useCurrentPlayingContext } from "@/contexts/CurrentPlayingContext";
import { useSongContext } from "@/contexts/SongContext";
import { ISong } from "@/types/ISong";
import AudioFunctions from "@/utils/audioFunctions";
import { getSongs } from "@/utils/getDataFromFirebase";

export interface IHomeProps {}

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile, setProfile } = useUserProfileContext();
  const { authenticated, setAuthenticated } = useAuthContext();
  const { current, setCurrent } = useCurrentPlayingContext();
  const { currentSong, setCurrentSong } = useSongContext();
  const [page, setPage] = React.useState(<div></div>);
  const [songs, setSongs] = React.useState<ISong[]>([]);
  const [hi, setHi] = React.useState<string>("");

  const router = useRouter();

  React.useEffect(() => {
    getSongs(setSongs);
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      if (current?.[0]) {
        try {
          const url = await getFirebaseFile(songs?.[current?.[0]].audio, setHi);
          const l = new AudioFunctions(url)
          setCurrentSong(l)
          currentSong?.pause();
        } catch (error) {
          console.log("Error fetching data" + error);
        }
      }
    };
    fetchData().then(()=>{
      // currentSong?.play()
    }
    )    
  }, [current?.[0]]);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setProfile({
          id: user.uid,
          email: user.email,
          fullname: user.displayName,
          password: "",
          avatarUrl: user.photoURL,
        });
        setAuthenticated(true);
        setPage(<div>{children}</div>);
      } else {
        // User is signed out
        // ...
        router.push("/auth/login");
      }
    });
  }, []);

  return page;
}
