"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

import { IoSearch } from "react-icons/io5";

import { fetchWeeklyNewSets, fetchWeeklyTrendingSets } from "../api/setsAPI";
import { useAuth } from "../utils/fbAuth";
import { checkLike, removeLike, addLike } from "../api/likesAPI";

import SetList from "@/components/setCards";
import Modal from "@/components/modal";

import { SingleSet } from "@/types/setTypes";


export default function Explore(){
    const router = useRouter();
    const { user } = useAuth(); 
    const [newSets, setNewSets] = useState<SingleSet[]>([]);
    const [trendingSets, setTrendingSets] = useState<SingleSet[]>([]);

    const [likedTrendingSets, setTrendingLikedSets] = useState<{ [key: string]: boolean }>({});
    const [likedNewSets, setNewLikedSets] = useState<{ [key: string]: boolean }>({});

    const [loggedInModal, setLoggedInModal] = useState<boolean>(false);

    const [inputSet, setInputSet] = useState<string>("");

    const getWeekly = async () =>{
        const weekSetResults = await fetchWeeklyNewSets();
        setNewSets(weekSetResults);

        const trendingSetResults = await fetchWeeklyTrendingSets();
        setTrendingSets(trendingSetResults);
    }

    useEffect(()=>{
        getWeekly();
    }, []);

    // Fetch likes for each set
    useEffect(() => {
        if (!user || trendingSets.length === 0) return;  // Ensure user is not null

        const fetchLikes = async () => {     
            const likesData: { [key: string]: boolean } = {}; // Store results

            // Fetch all likes concurrently using Promise.all
            const likePromises = trendingSets.map(async (set) => {
                const setId = set.id;
                const isLiked = await checkLike(setId, user.uid); 
                likesData[setId] = Boolean(isLiked);
            });

            await Promise.all(likePromises); // Wait for all promises to resolve
            setTrendingLikedSets(likesData); // Update state with fetched likes data

            const likeNewPromises = newSets.map(async (set) => {
                const setId = set.id;
                const isLiked = await checkLike(setId, user.uid); 
                likesData[setId] = Boolean(isLiked);
            });

            await Promise.all(likeNewPromises);
            setNewLikedSets(likesData);
        };

        fetchLikes();

    }, [trendingSets, user]);  
    
    // For Trending liked sets 
    const handleLikeStatus = async (setId: string, status: boolean) => {
        if(localStorage.getItem("setFinderIsLogged") === "false"){
            setLoggedInModal(true);
            return;
        }

        if(user){
            if(status == true){
                // Updates the current set to true/false 
                // Then triggers the useeffect which will display which sets are liked or not
                setTrendingLikedSets((prev) => ({ ...prev, [setId]: false }));
                removeLike(setId, user.uid);
            }else{
                setTrendingLikedSets((prev) => ({ ...prev, [setId]: true }));
                addLike(setId, user.uid);
            }
        }
    };

    // For Newest liked sets 
    const handleNewLikeStatus = async (setId: string, status: boolean) => {
        if(localStorage.getItem("setFinderIsLogged") === "false"){
            setLoggedInModal(true);
            return;
        }

        if(user){
            if(status == true){
                // Updates the current set to true/false 
                // Then triggers the useeffect which will display which sets are liked or not
                setNewLikedSets((prev) => ({ ...prev, [setId]: false }));
                removeLike(setId, user.uid);
            }else{
                setNewLikedSets((prev) => ({ ...prev, [setId]: true }));
                addLike(setId, user.uid);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/liveSet?setName=${encodeURIComponent(inputSet)}`);
        }
    };


    return(
        <main className="mb-40 w-4/5 mx-auto">
            <div className="relative text-lg mb-20">
                <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setInputSet(e.target.value)}
                        value={inputSet}
                        required
                        className="searchBar p-4 px-5 rounded-xl border-[3px] border-white bg-transparent outline-none w-[100%] text-xl tracking-wider font-bold"
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        onClick={() => {
                            router.push(`/liveSet?setName=${encodeURIComponent(inputSet)}`);
                        }}
                        className="searchBtn absolute right-5 top-1/2 transform -translate-y-1/2"
                    >
                        <IoSearch size={25} />
                    </button>
                </div>
            </div>

            <Modal
                title="You are not logged in"
                description="Please login to like a set"
                isOpen={loggedInModal}
                onClose={() =>{ setLoggedInModal(false) }}
            />
            <section className="mb-40">
                <h1 className="text-3xl tracking-wider -mb-2"> Trending Sets </h1> 
                {trendingSets.length > 0 ? (
                    <div className="overflow-x-auto">
                        <SetList
                            status="likeResults"
                            setResults={trendingSets}
                            likedSets={likedTrendingSets}
                            handleLikeStatus={handleLikeStatus}
                            style="flex gap-5 w-[4000px]"
                        />
                    </div>
                ) : (
                    <p>Loading trending sets...</p>
                )}
            </section>

            <section>
                <h2 className="text-3xl tracking-wider -mb-2"> Newest Releases</h2>
                {newSets.length > 0 ? (
                    <div className="overflow-x-auto">
                        <SetList
                            status="likeResults"
                            setResults={newSets}
                            likedSets={likedNewSets}
                            handleLikeStatus={handleNewLikeStatus}
                            style="flex gap-5 w-[4000px]"
                        />
                    </div>
                ) : (
                    <p>Loading trending sets...</p>
                )}
            </section>

            {/* <section>
                <h3 className="text-neonBlue text-3xl tracking-wider"> GENRE SPOTLIGHT: GENRE </h3>
                <p> Loading sets... </p>
            </section> */}
        </main>
    )
}