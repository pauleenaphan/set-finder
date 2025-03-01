"use client";
import Link from "next/link";
import Image from 'next/image';

import { useEffect, useState } from "react";

import "../app/styles/nav.css";

export default function WindowNav(){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // When the component is mounted, get the login state from localStorage
        const loggedInStatus = localStorage.getItem("setFinderIsLogged") === "true";
        setIsLoggedIn(loggedInStatus);
    }, []); // This will run only once when the component mounts

    return(
        // removed mb-[10%]
        <nav className="navBar flex justify-between px-[5%] items-center gap-32 sticky top-0 z-50 bg-mainBg bg-opacity-70">
            <Link href="/" className="logo w-[150px] py-3">
                <Image src="/assets/setFinderLogo.png" alt="setfinder logo" width={800} height={400}/>
            </Link>

            <div className="flex gap-6 text-xl items-center tracking-widest font-semibold">
                <Link href="/explore" className="hover:opacity-60">Explore</Link>
                <Link href="/library" className="hover:opacity-60">Library</Link>
                {isLoggedIn ? (
                    <Link href="/auth/account" className="hover:opacity-60">Account</Link>
                ) : (
                    <Link href="/auth/signup" className="ctaBtn">Sign Up</Link>
                )}
            </div>
        </nav>
    )
}