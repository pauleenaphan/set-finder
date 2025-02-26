"use client"

import { useEffect, useState } from "react";

import { getLikes } from "../api/likesAPI";
import { useAuth } from "../utils/fbAuth";
import { SetData } from "@/types/setTypes";

// import SetList from "@/components/setCards";
import { SetList } from "@/components/setCardsTwo";
import Modal from "@/components/modal";

export default function Library(){
    const [currTab, setCurrTab] = useState<string>("likes");
    const [userLikes, setUserLikes] = useState<SetData[]>([]); // temp string for now
    const [loggedInModal, setLoggedInModal] = useState<boolean>(false);

    const { user, loading: authLoading } = useAuth(); 

    useEffect(() => {
        if(localStorage.getItem("setFinderIsLogged") === "false"){
            setLoggedInModal(true);
        }
        if (currTab === "likes" && user) {
            // Ensure getLikes returns the correct type
            getLikes(user.uid).then((likes) => setUserLikes(likes));
        }
    }, [currTab, user]);

    return(
        <main className="mb-40 w-4/5 mx-auto">
            <Modal
                title="You are not logged in"
                description="Please login to view your library"
                isOpen={loggedInModal}
                onClose={() =>{ setLoggedInModal(false) }}
            />
            <div className="flex gap-10 text-3xl mb-4 font-bold">
            <button
                onClick={() => setCurrTab("likes")}
                className={`currTab pb-1 ${currTab === "likes" ? "border-b-2 border-white" : ""} tracking-wider`}
            >
                Likes
            </button>
            {/* <button
                onClick={() => setCurrTab("playlist")}
                className={`pb-1 ${currTab === "playlist" ? "border-b-2 border-neonBlue text-neonBlue" : ""} tracking-wider`}
            >
                PLAYLIST
            </button> */}
            </div>
            {currTab === "likes" ? (
                <section className="">
                    <SetList
                        setResults={userLikes}
                        style="flex flex-wrap gap-3 justify-between"
                    />
                </section>
                
            ) : (
                <p>Displaying Playlist</p>
            )}
        </main>
    )
}