"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import "../styles/sets.css";

import { fetchSets } from "../api/setsAPI";
import { SetData } from '@/types/setTypes';

import { checkLike, removeLike, addLike } from "../api/likesAPI";
import { useAuth } from "../utils/fbAuth";

import SetList from '@/components/setCards';

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
            <div className="w-4/5 mx-auto text-xl"> Loading Results... </div>
        )
    }

    return (
        <div className="w-4/5 mx-auto">
            <h1 className="text-3xl"> Results For: {setName} </h1>
            <div className="flex gap-8 flex-wrap my-10">
                <SetList
                    status="searchResults"
                    setResults={setResults}
                    likedSets={likedSets}
                    handleLikeStatus={handleLikeStatus}
                />
            </div>
        </div>
    );
}
