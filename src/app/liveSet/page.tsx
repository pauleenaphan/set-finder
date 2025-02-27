"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import "../styles/searchResults.css";

import { fetchSets } from "../api/setsAPI";
import { SetData } from '@/types/setTypes';
import { useAuth } from "../utils/fbAuth";

// import SetList from '@/components/setCards';
import { SetList } from '@/components/setCardsTwo';

function LiveSets() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setName = searchParams.get("setName");

    const { loading: authLoading } = useAuth(); 
    const [loading, setLoading] = useState(true);

    const [setResults, setSetResults] = useState<SetData[]>([]);

    const [inputSet, setInputSet] = useState<string>("");

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/liveSet?setName=${encodeURIComponent(inputSet)}`);
        }
    };

    // Fetch sets when setName changes
    useEffect(() => {
        if (authLoading) return;

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

    if(authLoading || loading){
        return( 
            <div className="caption w-4/5 mx-auto"> Loading Results... </div>
        )
    }

    return (
        <div className="w-4/5 mx-auto">
            <div className="relative text-lg mb-20">
                <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setInputSet(e.target.value)}
                        value={inputSet}
                        required
                        className="searchBar p-4 px-5 rounded-xl border-[3px] border-secondaryBg focus:border-white bg-secondaryBg outline-none w-full text-xl tracking-wider font-bold"
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

            <h1 className="text-3xl"> Results For: <span className='purpleHighlight'>{setName}</span> </h1>
            <div className='searchResultsSetListOuter'>
                <SetList
                    setResults={setResults}
                    style="flex flex-wrap gap-3 justify-between"
                />
            </div>
        </div>
    );
}

// Since we are using useSearchParams we need to make sure the component is rendered in the browser 
// Suspense allows us to wait for async operrations to finish before we render the component 
const SuspendedLiveSets = () => (
    <Suspense fallback={<div className="caption w-4/5 mx-auto">Loading...</div>}>
        <LiveSets />
    </Suspense>
);

export default SuspendedLiveSets