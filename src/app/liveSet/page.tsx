"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import "../styles/sets.css";

import { fetchSets } from "../api/setsAPI";
import { PlatformData, SetData } from '@/types/setTypes';

import { checkLike, removeLike, addLike } from "../api/likesAPI";
import { useAuth } from "../utils/fbAuth";

import { ImSoundcloud2 } from "react-icons/im";
import { ImYoutube } from "react-icons/im";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export default function liveSets() {
    const searchParams = useSearchParams();
    const setName = searchParams.get("setName");
    const { user, loading: authLoading } = useAuth();  // Get user from custom hook
    const [loading, setLoading] = useState(true);

    const [setResults, setSetResults] = useState<SetData[]>([]);
    const [likedSets, setLikedSets] = useState<{ [key: string]: boolean }>({});

    // Fetch sets when setName changes
    useEffect(() => {
        if (authLoading || !user) return;

        const fetchAndSetResults = async () => { 
            if(setName){
                setLoading(true); 
                const results = await fetchSets(setName);
                console.log("results from fetch", results);
                setSetResults(results || []);
                setLoading(false);
            }
        };

        fetchAndSetResults(); 
    }, [setName, authLoading]);

    // Fetch likes for each set
    useEffect(() => {
        console.log("Auth Loading:", authLoading);
        console.log("User:", user);

        if (!user || setResults.length === 0) return;  // Ensure user is not null

        const fetchLikes = async () => {     
            const likesData: { [key: string]: boolean } = {}; // Store results

            // Fetch all likes concurrently using Promise.all
            const likePromises = setResults.map(async (set) => {
                const setId = set.platforms[0].id;
                const isLiked = await checkLike(setId, user.uid); 
                likesData[setId] = Boolean(isLiked);
            });

            await Promise.all(likePromises); // Wait for all promises to resolve
            setLikedSets(likesData); // Update state with fetched likes data
        };

        fetchLikes();

    }, [setResults, user]);  

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
        }
    };

    if(authLoading || loading){
        return( 
            <div> Loading... </div>
        )
    }

    return (
        <div className="px-12">
            <h1 className="text-3xl"> Results For: {setName} </h1>
            <div className="flex gap-8 flex-wrap my-10">
                {(setResults || []).length > 0 ? (
                    setResults.map((set: SetData, index: number) => (
                        <div key={index} 
                            className="border-2 border-white w-1/3 flex flex-col gap-5 p-5">
                            <img src={set.platforms[0].thumbnail} alt="Platform Thumbnail" 
                                className="w-full"
                            />
                            <p className="text-bold text-xl"> {set.title} </p>
                            {/* Loops through each platform */}
                            {set.platforms.map((platform, pIndex) => (
                                <div key={pIndex} 
                                    className="flex items-center gap-3 text-lg">
                                    {platform.platform == "yt" ? (
                                        <a href={platform.link}>
                                            <ImYoutube/> 
                                        </a>
                                    ) : (
                                        <a href={platform.link}>
                                            <ImSoundcloud2/>
                                        </a>
                                    )}
                                    <p> Posted: {platform.publishedDate} </p>
                                </div>
                            ))}
                            <div className="flex justify-end">
                                {likedSets[set.platforms[0].id] ? (
                                    <FaHeart className="text-3xl cursor-pointer text-pink-500" 
                                        onClick={() => handleLikeStatus(set.platforms[0].id, true)} />
                                ) : (
                                    <FaRegHeart className="text-3xl cursor-pointer hover:text-pink-500" 
                                        onClick={() => handleLikeStatus(set.platforms[0].id, false)} />
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p> Loading Results...</p>
                )}
            </div>
        </div>
    );
}
