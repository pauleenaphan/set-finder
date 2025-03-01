"use client"
import { useEffect } from "react";
import { logoutUser } from "@/app/api/authAPI";
import { useRouter } from 'next/navigation';

import { useAuth } from "@/app/utils/fbAuth";

export default function Account() {
    const router = useRouter();
    const { user } = useAuth(); 

    useEffect(()=>{
        document.title = "SetFinder | My Account";
    }, []);

    const handleLogout = async () => {
        await logoutUser(); 
        router.push("/"); 

        // Reload the page after navigation is initiated
        setTimeout(() => {
            window.location.reload();
        }, 500); // Small delay to ensure router push happens first
    };


    return (
        <main className="mb-40 w-4/5 mx-auto mt-[8%]">
            <h1 className="text-3xl tracking-wider mb-6"> Account Management </h1>
            <p className="mb-52 tracking-wide"> Email: <span>{user?.email}</span> </p>
            <button onClick={handleLogout} className="ctaBtn"> Logout </button>
        </main>
    );
}