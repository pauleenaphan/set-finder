"use client";
import Link from "next/link";
import Image from 'next/image';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

import logo from "../assets/setfinderLogo.png";
import logo2 from "../assets/setfinderLogo2.png";

import "../app/styles/nav.css";

export default function Nav(){
    const router = useRouter();
    const [inputSet, setInputSet] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const [menuOpen, setMenuOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false); 

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
            <Link href="/" className="logo w-[20%]" >
                <Image src={logo2} alt="setfinder logo"/>
            </Link>
            

            <div className="relative text-lg">
                {/* Search Bar that only shows the icon initially */}
                {!isSearchActive ? (
                    <IoSearch 
                        size={24} 
                        onClick={() => { 
                            setIsSearchActive(true);
                            setMenuOpen(false);
                        }} 
                        className="searchIcon cursor-pointer"
                    />
                ) : (
                    <div className="flex gap-2 items-center">
                        <input
                            type="text"
                            placeholder="Search for Set"
                            onChange={(e) => setInputSet(e.target.value)}
                            value={inputSet}
                            required
                            className="p-2 px-5 rounded-3xl border-2 border-white bg-transparent outline-none w-[300px]"
                            onKeyDown={handleKeyPress}
                        />
                        <button
                            onClick={() => {
                                router.push(`/liveSet?setName=${encodeURIComponent(inputSet)}`);
                                setIsSearchActive(false); 
                            }}
                            className="absolute right-12 top-1/2 transform -translate-y-1/2"
                        >
                            <IoSearch size={20} />
                        </button>
                        <button 
                            onClick={() =>{ setIsSearchActive(false) }}
                            className="text-xl ml-2"
                            > X </button> 
                    </div>
                )}
            </div>
            
            {/* Hamburger Menu for small screens */}
            <div className="sm:hidden">
                <RxHamburgerMenu 
                    size={30} 
                    onClick={() => setMenuOpen(!menuOpen)} 
                    className="cursor-pointer"
                />
                {/* Dropdown Menu */}
                {menuOpen && (
                    <div className="absolute top-20 right-0 bg-bgColor shadow-lg rounded-lg px-12 py-4 w-full">
                        <Link href="/explore" className="block py-2 hover:opacity-60" onClick={() =>{ setMenuOpen(false); }}>EXPLORE</Link>
                        <Link href="/library" className="block py-2 hover:opacity-60" onClick={() =>{ setMenuOpen(false); }}>LIBRARY</Link>
                        {isLoggedIn ? (
                            <Link href="/auth/account" className="block py-2 hover:opacity-60" onClick={() =>{ setMenuOpen(false); }}>ACCOUNT</Link>
                        ) : (
                            <Link href="/auth/signup" className="ctaBtn block py-2" onClick={() => { setMenuOpen(false); }}>SIGN UP</Link>
                        )}
                    </div>
                )}
            </div>

            {/* Regular Menu for large screens */}
            <div className="hidden sm:flex gap-8 text-lg items-center tracking-[2px]">
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