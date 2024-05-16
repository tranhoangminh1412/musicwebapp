"use client";
import * as React from "react";

import { store } from "@/store";

import { Provider as ReduxProvider } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { UserProfileContext } from "@/contexts/ProfileContext";
import { AuthContext } from "@/contexts/AuthContext";
import { CurrentPlayingContext } from "@/contexts/CurrentPlayingContext";
import { SongProgressContext } from "@/contexts/SongProgressContext";
import { SongContext } from "@/contexts/SongContext";
import AudioFunctions from "@/utils/audioFunctions";

export function Providers({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = React.useState<any>(null);
  const [authenticated, setAuthenticated] = React.useState<any>(false);
  const [current, setCurrent] = React.useState<any>([]);
  const [progress, setProgress] = React.useState<number>(0);
  const [currentSong, setCurrentSong] = React.useState<AudioFunctions>();

  const clientId =
    "752827926431-6n24u15f6k9al524t0j9hpa2bi24f4f9.apps.googleusercontent.com";

  return (
    <ReduxProvider store={store}>
        <UserProfileContext.Provider value={{ profile, setProfile }}>
          <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            <CurrentPlayingContext.Provider value={{ current, setCurrent }}>
              <SongProgressContext.Provider value={{ progress, setProgress }}>
                <SongContext.Provider
                  value={{currentSong, setCurrentSong}}
                >
                  {children}
                </SongContext.Provider>
              </SongProgressContext.Provider>
            </CurrentPlayingContext.Provider>
          </AuthContext.Provider>
        </UserProfileContext.Provider>
    </ReduxProvider>
  );
}
