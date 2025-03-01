"use client";
import Link from "next/link";
import Image from 'next/image';

import { useEffect, useState } from "react";

import { FaMusic, FaUser } from "react-icons/fa";
import { MdCollectionsBookmark } from "react-icons/md";

import { RxHamburgerMenu } from "react-icons/rx";

// import logo from "../assets/setFinderLogo.png";

import "../app/styles/nav.css";

export default function MobileNav(){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedInStatus = localStorage.getItem("setFinderIsLogged") === "true";
            setIsLoggedIn(loggedInStatus);
        }
    }, []);

    const closeMenu = () =>{
        setIsMenuOpen(false);
    }

    return(
        <nav className="navBar flex px-[5%] justify-between items-center gap-32 mb-[8%]">
            <Link href="/" className="logo w-[20%] py-3" onClick={closeMenu}>
                <div className="logoContainer">
                    <Image className="logo" src="/assets/setFinderLogo.png" alt="setfinder logo" width={200} height={200}/>
                </div>
            </Link>

            <div className="flex gap-4 text-2xl">
                <button onClick={() =>{ 
                        setIsMenuOpen(!isMenuOpen);
                    }}>
                    <RxHamburgerMenu />
                </button>
            </div>

            <div className={`z-50 absolute tracking-[2px] bg-mainBg top-28 right-0 py-4 px-8 w-full h-full text-white font-semibold text-lg flex flex-col overflow-hidden transition-all duration-300 ease-in-out 
                ${isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}>

                <div className="flex items-center gap-2 mx-auto hover:opacity-80">
                    <FaMusic/>
                    <Link href="/explore" className="py-3" onClick={closeMenu}>Explore</Link>
                </div>
                
                <div className="flex items-center gap-2 mx-auto hover:opacity-80">
                    <MdCollectionsBookmark />
                    <Link href="/library" className="py-3" onClick={closeMenu}>Library</Link>
                </div>
                
                {isLoggedIn ? (
                    <div className="flex items-center gap-2 mx-auto hover:opacity-80">
                        <FaUser />
                        <Link href="/auth/account" className="py-3" onClick={closeMenu}>Account</Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 mx-auto hover:opacity-80">
                        <FaUser />
                        <Link href="/auth/signup" className="py-3 mx-auto" onClick={closeMenu}>Sign Up</Link>
                    </div>
                    
                )}
            </div>
            
        </nav>
    )
}