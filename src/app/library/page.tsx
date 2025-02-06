"use client"

import { useEffect, useState } from "react";

import { getLikes } from "../api/likesAPI";
import { useAuth } from "../utils/fbAuth";

export default function library(){
    const [currTab, setCurrTab] = useState<string>("likes");
    const [userLikes, setUserLikes] = useState<string>(""); // temp string for now

    const { user, loading: authLoading } = useAuth(); 

    useEffect(() =>{
        if(currTab == "likes"){
            if(user){
                getLikes(user.uid);
            }
        }
    }, [currTab, user])

    if(authLoading){
        return( 
            <div> Loading... </div>
        )
    }

    return(
        <main className="mb-40 w-4/5 mx-auto">
            <div className="flex gap-10 text-3xl mb-10 font-bold">
            <button
                onClick={() => setCurrTab("likes")}
                className={`pb-1 ${currTab === "likes" ? "border-b-2 border-neonBlue text-neonBlue" : ""} tracking-wider`}
            >
                LIKES 
            </button>
            <button
                onClick={() => setCurrTab("playlist")}
                className={`pb-1 ${currTab === "playlist" ? "border-b-2 border-neonBlue text-neonBlue" : ""} tracking-wider`}
            >
                PLAYLIST
            </button>
            </div>
            {currTab === "likes" ? (
                <p>Displaying likes</p>
            ) : (
                <p>Displaying Playlist</p>
            )}
        </main>
    )
}