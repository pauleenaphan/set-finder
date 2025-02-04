"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { fetchSets } from "../api/utils/getSets";
import { PlatformData, SetData } from '@/types/setTypes';

export default function liveSets() {
    const searchParams = useSearchParams();
    const setName = searchParams.get("setName");

    const [setResults, setSetResults] = useState<SetData[]>([]);

    useEffect(() => {
        const fetchAndSetResults = async () => { 
            if(setName){
                const results = await fetchSets(setName);
                console.log("results from fetch", results);
                setSetResults(results || []);
            }
        };
    
        fetchAndSetResults(); 
    }, [setName]);

    return (
        <div className="px-12">
            <h1 className="text-3xl"> Results For: {setName} </h1>
            <div className="flex gap-8 flex-col my-10">
                {(setResults || []).length > 0 ? (
                    setResults.map((set: SetData, index: number) => (
                        <div key={index} 
                            className="border border-white">
                            <p>{set.title}</p>
                            {/* Loops through each platform */}
                            {set.platforms.map((platform, pIndex) => (
                                <div key={pIndex}>
                                    <p>Platform: {platform.platform}</p>
                                    <p>ID: {platform.id}</p>
                                    <a href={platform.link}>Listen here</a>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p> Loading Results...</p>
                )}
            </div>
            
        </div>
    );
}