"use client";

import React, { useContext } from "react";

import { ICurrent } from "@/types/ICurrent";

export interface ISongProgressContext {
  progress: number | null;
  setProgress: any;
}

export const SongProgressContext =
  React.createContext<ISongProgressContext>({
    progress: 0,
    setProgress: () => {},
  });

export const useSongProgressContext = () => useContext(SongProgressContext);