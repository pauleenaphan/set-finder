"use client"

import { logoutUser } from "@/app/api/authAPI";
import { useRouter } from 'next/navigation';

export default function account() {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser(); 
        router.push("/"); 

        // Reload the page after navigation is initiated
        setTimeout(() => {
            window.location.reload();
        }, 150); // Small delay to ensure router push happens first
    };


    return (
        <main>
            <p> This is the account page </p>
            <button onClick={handleLogout}> Logout </button>
        </main>
    );
}