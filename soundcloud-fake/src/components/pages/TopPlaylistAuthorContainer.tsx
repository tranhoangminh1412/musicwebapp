import * as React from "react";
import { useRef, useState, useEffect } from "react";

import { playlists } from "@/constants/playlists.constant";

import { orderedPopularPlaylist } from "@/utils/orderPopularPlaylists";

import TopPlaylistAuthorShowcase from "./TopPlaylistAuthorShowcase";

export interface ITopPlaylistAuthorContainerProps {}

export default function TopPlaylistAuthorContainer(
  props: ITopPlaylistAuthorContainerProps
) {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  const popularPlaylists = orderedPopularPlaylist();

  useEffect(() => {
    const handleScroll = () => {
      const scrollableElement = scrollableRef.current;
      if (scrollableElement) {
        setIsAtStart(scrollableElement.scrollLeft === 0);
        setIsAtEnd(
          scrollableElement.scrollLeft + 285 >= scrollableElement.clientWidth
        );
      }
    };

    const scrollableElement = scrollableRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!isAtStart) {
      console.log("scroll is not at start");
    }
    if (isAtEnd) {
      console.log("scroll is at end");
    }
  }, [isAtStart, isAtEnd]);

  return (
    <div className="relative">
      {!isAtStart && (
        <div
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
          }}
          className="w-[76px] h-[185px] absolute left-0 top-0"
        ></div>
      )}
      <div
        ref={scrollableRef}
        className="relative h-[185px] w-inherit overflow-x-auto"
      >
        <div className="gap-4 flex absolute">
          {popularPlaylists.map(function (data) {
            return (
              <TopPlaylistAuthorShowcase
                key={data.id}
                playlistId={data.id}
                name={data.name}
                popularSongIndex={data.songs[0]}
              />
            );
          })}
        </div>
      </div>
      {!isAtEnd && (
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
          }}
          className="w-[76px] h-[185px] absolute right-0 top-0"
        ></div>
      )}
    </div>
  );
}
