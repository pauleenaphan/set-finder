"use client"

import { logoutUser } from "@/app/api/authAPI";
import { useRouter } from 'next/navigation';

import { useAuth } from "@/app/utils/fbAuth";

export default function account() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth(); 

    const handleLogout = async () => {
        await logoutUser(); 
        router.push("/"); 

        // Reload the page after navigation is initiated
        setTimeout(() => {
            window.location.reload();
        }, 500); // Small delay to ensure router push happens first
    };


    return (
        <main className="mb-40 w-4/5 mx-auto">
            <h1 className="text-neonBlue text-3xl tracking-wider mb-6"> ACCOUNT MANAGEMENT </h1>
            <p className="mb-52"> Email: {user?.email} </p>
            <button onClick={handleLogout} className="ctaBtn"> Logout </button>
        </main>
    );
}