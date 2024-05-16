
"use client";

import React, { useContext } from "react";

import AudioFunctions from "@/utils/audioFunctions";

export interface ISongContext {
  currentSong?: AudioFunctions;
  setCurrentSong: Function;
}

export const SongContext =
  React.createContext<ISongContext>({
    currentSong: undefined,
    setCurrentSong: () => {},
  });

export const useSongContext = () => useContext(SongContext);