import { IArtist } from "@/types/IArtist";

import { artists } from "@/constants/artists.constant";
import { songs } from "@/constants/songs.constant";

export const orderedPopularArtists = (): IArtist[] => {
  // Deep clone the playlists array
  let clone: IArtist[] = JSON.parse(JSON.stringify(artists));

  // Sort the playlists array in descending order based on total number of plays
  clone.sort((a: IArtist, b: IArtist): number => {
    // Calculate total number of plays for playlist a
    let totalPlaysA: number = a.plays;
    // Calculate total number of plays for playlist b
    let totalPlaysB: number = b.plays;

    // Sort in descending order based on total number of plays
    return totalPlaysB - totalPlaysA;
  });

  return clone;
};
