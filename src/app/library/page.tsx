"use client"

import { useEffect, useState } from "react";

import { getLikes } from "../api/likesAPI";
import { getAllUserPlaylist } from "../api/playlistAPI";
import { useAuth } from "../utils/fbAuth";
import { SetData } from "@/types/setTypes";

// import SetList from "@/components/setCards";
import { SetList } from "@/components/setCardsTwo";
import Modal from "@/components/modal";

import { useRouter } from 'next/navigation';
import { AllOfUserPlaylist } from "@/types/playlistTypes";
import { UsersPlaylists } from "@/components/allPlaylist";

export default function Library(){
    const router = useRouter();
    const [currTab, setCurrTab] = useState<string>("likes");
    const [userLikes, setUserLikes] = useState<SetData[]>([]); // temp string for now
    const [allUserPlaylist, setAllUserPlaylist] = useState<AllOfUserPlaylist | null>();
    const [loggedInModal, setLoggedInModal] = useState<boolean>(false);

    const { user } = useAuth(); 

    useEffect(()=>{
        document.title = "SetFinder | Your Library";
    }, []);

    useEffect(() => {
        if(localStorage.getItem("setFinderIsLogged") === "false"){
            setLoggedInModal(true);
        }
        if(currTab === "likes" && user){
            // Ensure getLikes returns the correct type
            getLikes(user.uid).then((likes) => setUserLikes(likes));
        }else if(currTab === "playlist" && user){
            getAllUserPlaylist(user.uid).then((playlist) => setAllUserPlaylist(playlist || null));
        }
    }, [currTab, user]);

    return(
        <main className="mb-40 w-4/5 mx-auto mt-[8%]">
            <Modal
                title="You are not logged in"
                description="Please login to view your library"
                isOpen={loggedInModal}
                onClose={() =>{ 
                    setLoggedInModal(false)
                    router.push("/auth/login") }}
            />
            <div className="flex gap-10 text-3xl mb-4 font-bold">
                <button
                    onClick={() => setCurrTab("likes")}
                    className={`currTab pb-2 ${currTab === "likes" ? "border-b-2 border-white" : ""} tracking-wider`}
                >
                    Likes
                </button>
                <button
                    onClick={() => setCurrTab("playlist")}
                    className={`currTab pb-2 ${currTab === "playlist" ? "border-b-2 border-white" : ""} tracking-wider`}
                >
                    Playlists
                </button>
            </div>
            {currTab === "likes" ? (
                <section className="">
                    <SetList
                        setResults={userLikes}
                        style="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3"
                    />
                </section>
                
            ) : (
                <section>
                    <UsersPlaylists
                        listOfPlaylist={allUserPlaylist?.listOfPlaylist || []}
                    />
                        
                </section>
            )}
        </main>
    )
}