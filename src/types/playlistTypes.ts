// Types for playlist
import { SetData } from "./setTypes";

// list of playlist
export interface AllOfUserPlaylist{
    listOfPlaylist: Playlist[]
}

// single playlist 
export interface Playlist{
    id?: string;
    name: string;
    description: string;
    dateCreated?: string;
    listOfSets?: SetData[];
    tags: string[];

    // For future features
    coverImg?: string;
    creator?: string;
    shareLink?: string;
}