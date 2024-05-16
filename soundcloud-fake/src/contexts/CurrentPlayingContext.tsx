"use client";

import React, { useContext } from "react";

import { ICurrent } from "@/types/ICurrent";

export interface ICurrentPlayingContext {
  current: number[] | null;
  setCurrent: any;
}

export const CurrentPlayingContext =
  React.createContext<ICurrentPlayingContext>({
    current: [],
    setCurrent: () => {},
  });

export const useCurrentPlayingContext = () => useContext(CurrentPlayingContext);
