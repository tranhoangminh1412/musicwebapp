import axios from "axios";
import { IResSongs } from "@/types/res.type";
import { ISong } from "@/types/ISong";

const fetchSongs = async () => {
  const data = await axios.get("/api/songs");
  return data.data;
};
export const getSongs = async (
  setSongs: React.Dispatch<React.SetStateAction<ISong[] >>
) => {
  try {
    const data = (await fetchSongs()) as IResSongs;
    setSongs(data.data);
  } catch (error) {
    console.log("error fetching songs data");
  }
};
