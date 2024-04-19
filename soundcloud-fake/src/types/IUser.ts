export type IUser = {
    id: number;
    name?: string;
    username: string;
    password?: string;
    favSongs?: number[];
    favPlaylists?: number[];
    avatarUrl?: string;
};