"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { fetchSets } from "../api/utils/getSets";

export default function liveSets() {
    const searchParams = useSearchParams();
    const setName = searchParams.get("setName");

    const [setResults, setSetResults] = useState<any>("");

    useEffect(() => {
        const fetchAndSetResults = async () => { 
            if(setName){
                const results = await fetchSets(setName);
                setSetResults(results); // Update state with the results
            }
        };
    
        fetchAndSetResults(); 
    }, [setName]);

    return (
        <div>
            <p> Set Name: {setName} </p>
            {setResults.length > 0 ? (
                setResults.map((result: string, index: number) => (
                <div key={index}>
                    <p> {result[0]} </p>
                    <a href={result[1]}> {result[1]} </a>
                </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}