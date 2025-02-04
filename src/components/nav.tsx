"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

import { IoSearch } from "react-icons/io5";

export default function Nav(){
    const router = useRouter();
    const [inputSet, setInputSet] = useState<string>("");

    return(
        <nav className="flex justify-between px-12 py-8 items-center gap-32 mb-12">
            <div className=" w-[15%]">
                <h1> Set-Finder Logo Here</h1>
            </div>
            

            <div className="flex w-[35%] relative text-lg">
                <input type="text" placeholder="Search for Set" onChange={(e) =>{setInputSet(e.target.value)}} required
                    className="p-2 px-5 rounded-3xl w-full border-2 border-white"
                ></input>
                <button onClick={() =>{ router.push(`/liveSet?setName=${encodeURIComponent(inputSet)}`)}} 
                    className="absolute right-5 top-1/2 transform -translate-y-1/2">
                    <IoSearch size={24} />
                </button>
            </div>
            
            <div className="flex gap-8 text-lg items-center tracking-[2px]">
                <a> EXPLORE </a>
                <a> LIBRARY </a>
                <a className="ctaBtn"> SIGN UP </a> {/* If user is logged in then change to account */}
            </div>
            
        </nav>
    )
}