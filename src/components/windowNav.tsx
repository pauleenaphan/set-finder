"use client";
import Link from "next/link";
import Image from 'next/image';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { IoSearch } from "react-icons/io5";

import logo from "../assets/setfinderLogo2.png";

import "../app/styles/nav.css";

export default function WindowNav(){
    const router = useRouter();
    const [inputSet, setInputSet] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // When the component is mounted, get the login state from localStorage
        const loggedInStatus = localStorage.getItem("setFinderIsLogged") === "true";
        setIsLoggedIn(loggedInStatus);
    }, []); // This will run only once when the component mounts

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/liveSet?setName=${encodeURIComponent(inputSet)}`);
        }
    };

    return(
        <nav className="navBar flex justify-between px-12 py-8 items-center gap-32 mb-[8%]">
            <Link href="/" className="logo w-[300px]" >
                <Image src={logo} alt="setfinder logo"/>
            </Link>
            
            <div className="relative text-lg">
                <div className="flex gap-2 items-center w-[300px]">
                    <input
                        type="text"
                        placeholder="Search for Set"
                        onChange={(e) => setInputSet(e.target.value)}
                        value={inputSet}
                        required
                        className="searchBar p-2 px-5 rounded-2xl border-[3px] border-white bg-transparent outline-none w-[100%]"
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        onClick={() => {
                            router.push(`/liveSet?setName=${encodeURIComponent(inputSet)}`);
                        }}
                        className="searchBtn absolute right-5 top-1/2 transform -translate-y-1/2"
                    >
                        <IoSearch size={20} />
                    </button>
                </div>
            </div>

            <div className="navLinks flex gap-6 text-xl items-center tracking-[2px]">
                <Link href="/explore" className="hover:opacity-60">EXPLORE</Link>
                <Link href="/library" className="hover:opacity-60">LIBRARY</Link>
                {isLoggedIn ? (
                    <Link href="/auth/account" className="hover:opacity-60">ACCOUNT</Link>
                ) : (
                    <Link href="/auth/signup" className="ctaBtn">SIGN UP</Link>
                )}
            </div>
            
        </nav>
    )
}