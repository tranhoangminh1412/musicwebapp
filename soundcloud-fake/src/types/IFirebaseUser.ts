export type IFirebaseUser = {
    id: number;
    name: string;
    username?: string;
    email:string;
    password?: string;
    favSongs?: number[];
    favPlaylists?: number[];
    avatarUrl?: string;
};