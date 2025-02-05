"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { fetchSets } from "../api/utils/getSets";
import { PlatformData, SetData } from '@/types/setTypes';

import { ImSoundcloud2 } from "react-icons/im";
import { ImYoutube } from "react-icons/im";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

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
            <div className="flex gap-8 flex-wrap my-10">
                {(setResults || []).length > 0 ? (
                    setResults.map((set: SetData, index: number) => (
                        <div key={index} 
                                className="border-2 border-white w-1/3">
                            <img src={set.platforms[0].thumbnail} alt="Platform Thumbnail" 
                                className="w-full"
                            />
                            <p>{set.title}</p>
                            {/* Loops through each platform */}

                            {set.platforms.map((platform, pIndex) => (
                                <div key={pIndex} 
                                    className="flex items-center">
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
                                    {/* <p>Platform: {platform.platform}</p> */}
                                    {/* <p>ID: {platform.id}</p> */}
                                    {/* <a href={platform.link}>Listen here</a> */}
                                </div>
                            ))}
                            <FaRegHeart/>
                        </div>
                    ))
                ) : (
                    <p> Loading Results...</p>
                )}
            </div>
        </div>
    );
}