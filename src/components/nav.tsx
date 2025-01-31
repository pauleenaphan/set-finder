"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Nav(){
    const router = useRouter();
    const [inputSet, setInputSet] = useState<string>("");

    return(
        <nav>
            <p> Set-Finder </p>
            <input type="text" placeholder="Search for Set" onChange={(e) =>{setInputSet(e.target.value)}} required></input>
            <button onClick={() =>{ router.push(`/liveSet?setName=${encodeURIComponent(inputSet)}`)}}> Search </button>

            <a> User Library </a>
            <a> User Profile </a>
        </nav>
    )
}