"use client";
import Link from "next/link";
import Image from 'next/image';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { IoSearch } from "react-icons/io5";
import { FaMusic, FaUser } from "react-icons/fa";
import { MdCollectionsBookmark } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

import logo from "../assets/setFinderLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";

import "../app/styles/nav.css";

export default function MobileNav(){
    const router = useRouter();
    const [inputSet, setInputSet] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedInStatus = localStorage.getItem("setFinderIsLogged") === "true";
            setIsLoggedIn(loggedInStatus);
        }
    }, []);
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/liveSet?setName=${encodeURIComponent(inputSet)}`);
            setIsSearchOpen(false);
        }
    };

    const closeMenu = () =>{
        setIsMenuOpen(false);
        setIsSearchOpen(false);
    }

    return(
        <nav className="navBar flex px-12 justify-between py-8 items-center gap-32 mb-[8%]">
            <Link href="/" className="logo w-[20%]" onClick={closeMenu}>
                <Image src={logo} alt="setfinder logo"/>
            </Link>

            <div className="flex gap-4 text-2xl">
                <button onClick={() => { 
                        setIsSearchOpen(!isSearchOpen);
                        setIsMenuOpen(false); }}>
                    {isSearchOpen ? <IoIosClose size={36}/> : <IoSearch/>}
                </button>
                <button onClick={() =>{ 
                        setIsMenuOpen(!isMenuOpen);
                        setIsSearchOpen(false);
                    }}>
                    <RxHamburgerMenu />
                </button>
            </div>

            <div className={`absolute tracking-[2px] bg-bgColor top-28 right-0 py-4 pb-8 h-full px-8 w-full text-white flex flex-col overflow-hidden transition-all duration-300 ease-in-out 
                ${isSearchOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}>
                <div className="flex gap-2 items-center relative z-100">
                    <input
                        type="text"
                        placeholder="Search for Set"
                        onChange={(e) => setInputSet(e.target.value)}
                        value={inputSet}
                        required
                        className="p-2 px-5 rounded-2xl border-[3px] border-white bg-transparent outline-none w-full"
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        onClick={() => {
                            router.push(`/liveSet?setName=${encodeURIComponent(inputSet)}`);
                            setIsSearchOpen(false);
                        }}
                        className="absolute right-5 top-1/2 transform -translate-y-1/2"
                    >
                        <IoSearch size={20} />
                    </button>
                </div>
            </div> 

            <div className={`absolute tracking-[2px] bg-bgColor top-28 right-0 py-4 px-8 w-full h-full text-white text-lg flex flex-col overflow-hidden transition-all duration-300 ease-in-out 
                ${isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}>

                <div className="flex items-center gap-2 mx-auto">
                    <FaMusic/>
                    <Link href="/explore" className="py-3" onClick={closeMenu}>EXPLORE</Link>
                </div>
                
                <div className="flex items-center gap-2 mx-auto">
                    <MdCollectionsBookmark />
                    <Link href="/library" className="py-3" onClick={closeMenu}>LIBRARY</Link>
                </div>
                
                {isLoggedIn ? (
                    <div className="flex items-center gap-2 mx-auto">
                        <FaUser />
                        <Link href="/auth/account" className="py-3" onClick={closeMenu}>ACCOUNT</Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 mx-auto">
                        <FaUser />
                        <Link href="/auth/signup" className="py-3 mx-auto" onClick={closeMenu}>SIGN UP</Link>
                    </div>
                    
                )}
            </div>
            
        </nav>
    )
}