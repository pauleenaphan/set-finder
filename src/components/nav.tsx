"use client";
import Link from "next/link";
import Image from 'next/image';

import { useState } from "react";
import { useRouter } from 'next/navigation';

import { IoSearch } from "react-icons/io5";

import logo from "../assets/setfinderLogo.png";
import logo2 from "../assets/setfinderLogo2.png";

export default function Nav(){
    const router = useRouter();
    const [inputSet, setInputSet] = useState<string>("");

    return(
        <nav className="flex justify-between px-12 py-8 items-center gap-32 mb-32">
            <Link href="/" className=" w-[20%]" >
                <Image src={logo2} alt="setfinder logo" className=""/>
            </Link>
            

            <div className="flex w-[35%] relative text-lg">
                <input type="text" placeholder="Search for Set" onChange={(e) =>{setInputSet(e.target.value)}} required
                    className="p-2 px-5 rounded-3xl w-full border-2 border-white bg-bgColor"
                ></input>
                <button onClick={() =>{ router.push(`/liveSet?setName=${encodeURIComponent(inputSet)}`)}} 
                    className="absolute right-5 top-1/2 transform -translate-y-1/2">
                    <IoSearch size={24} />
                </button>
            </div>
            
            <div className="flex gap-8 text-lg items-center tracking-[2px]">
                <Link href="/explore" className="hover:opacity-60"> EXPLORE </Link>
                <Link href="/library" className="hover:opacity-60"> LIBRARY </Link>
                <Link href="/auth/signup" className="ctaBtn"> SIGN UP </Link> {/* If user is logged in then change to account */}
            </div>
            
        </nav>
    )
}