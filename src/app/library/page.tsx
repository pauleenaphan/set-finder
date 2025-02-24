"use client"

import { useEffect, useState } from "react";

import { getLikes, checkLike, removeLike, addLike } from "../api/likesAPI";
import { useAuth } from "../utils/fbAuth";
import { UserLikesParam } from "@/types/setTypes";

import SetList from "@/components/setCards";
import Modal from "@/components/modal";

export default function Library(){
    const [currTab, setCurrTab] = useState<string>("likes");
    const [userLikes, setUserLikes] = useState<UserLikesParam[]>([]); // temp string for now
    const [likedSets, setLikedSets] = useState<{ [key: string]: boolean }>({});
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

    useEffect(() => {
        console.log("Auth Loading:", authLoading);
        console.log("User:", user);

        if (!user || userLikes.length === 0) return;  // Ensure user is not null

        const fetchLikes = async () => {     
            const likesData: { [key: string]: boolean } = {}; // Store results

            // Fetch all likes concurrently using Promise.all
            const likePromises = userLikes.map(async (set) => {
                const setId = set.id;
                const isLiked = await checkLike(setId, user.uid); 
                likesData[setId] = Boolean(isLiked);
            });

            await Promise.all(likePromises); // Wait for all promises to resolve
            setLikedSets(likesData); // Update state with fetched likes data
        };

        fetchLikes();

    }, [userLikes, user]);  
    
    // Triggers when a set is liked or unliked
    const handleLikeStatus = async (setId: string, status: boolean) => {
        if (user) {
            if(status == true){
                // Updates the current set to true/false 
                // Then triggers the useeffect which will display which sets are liked or not
                setLikedSets((prev) => ({ ...prev, [setId]: false }));
                removeLike(setId, user.uid);
            }else{
                setLikedSets((prev) => ({ ...prev, [setId]: true }));
                addLike(setId, user.uid);
            }
            getLikes(user.uid).then((likes) => setUserLikes(likes));
        }
    };

    if(authLoading){
        return( 
            <div className="w-4/5 mx-auto"> Loading... </div>
        )
    }

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
                <section className="likesList">
                    <SetList
                        status="likesResult"
                        setResults={userLikes}
                        likedSets={likedSets}
                        handleLikeStatus={handleLikeStatus}
                        style="flex flex-wrap justify-between gap-5"
                    />
                </section>
                
            ) : (
                <p>Displaying Playlist</p>
            )}
        </main>
    )
}