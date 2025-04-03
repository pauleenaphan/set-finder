import { deleteDoc, collection, doc, getDoc, setDoc, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

import { getFormattedDate } from "../utils/date";
import { AllOfUserPlaylist, Playlist } from "@/types/playlistTypes";

// Creates new playlist with empty sets 
export const createPlaylist = async(userUid: string, name: string, description: string, tags: string[]) =>{
    try{
        await addDoc(collection(db, "users", userUid, "playlist"), {
            name: name,
            description: description,
            dateCreated: getFormattedDate(),
            listOfSets: [],
            tags: tags,
        })

        console.log("created new playlist");
    }catch(error){
        console.error("Error creating new playlist", error);
    }
}

// loads all of users playlist 
export const getAllUserPlaylist = async(userUid: string) =>{
    try{
        // Initialize userPlaylistResult with the UserPlaylist type
        const userPlaylistResult: AllOfUserPlaylist = { listOfPlaylist: [] };

        const playlists = await getDocs(collection(db, "users", userUid, "playlist"));
    
        // Push each playlist into listOfPlaylist
        playlists.forEach((doc) => {
            userPlaylistResult.listOfPlaylist.push({
                ...doc.data(),
                id: doc.id
            } as Playlist);
        });
    
        return userPlaylistResult; 
        
    }catch(error){
        console.error("Error fetching all of user's playlist", error);
    }
}

// loads a single user playlist 
export const getSinglePlaylist = async(userUid: string, playlistId: string) =>{
    try{
        // const singlePlaylistResult: Playlist[];

        const singlePlaylist = await getDocs(collection(db, "users", userUid, "playlist", playlistId));
    }catch(error){
        console.error("Error fetching single playlist", error);
    }
}

// add a set to user playlist

// deletes a user playlist 

// edit a user playlist 