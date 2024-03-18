import { IPlaylist } from "@/types/IPlaylist"; // Assuming you have defined types for Playlist and Song
import { ISong } from "@/types/ISong";

import { playlists } from "@/constants/playlists.constant";
import { songs } from "@/constants/songs.constant";

export const orderedPopularPlaylist = (): IPlaylist[] => {
  // Deep clone the playlists array
  let clone: IPlaylist[] = JSON.parse(JSON.stringify(playlists));

  // Sort the playlists array in descending order based on total number of plays
  clone.sort((a: IPlaylist, b: IPlaylist): number => {
    // Calculate total number of plays for playlist a
    let totalPlaysA: number = 0;
    a.songs.forEach((s) => {
      totalPlaysA += songs[s].plays;
    });
    // Calculate total number of plays for playlist b
    let totalPlaysB: number = 0;
    b.songs.forEach((s) => {
      totalPlaysB += songs[s].plays;
    });

    // Sort in descending order based on total number of plays
    return totalPlaysB - totalPlaysA;
  });

  return clone;
};
