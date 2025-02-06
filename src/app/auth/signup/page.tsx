"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';

import { useState } from "react";
import "../../styles/auth.css";

import { FcGoogle } from "react-icons/fc";

import { signUpWithoutGoogle, signUpOrInWithGoogle } from "../../api/authAPI";

export default function SignupForm() {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [errorMsg, setErrorMsg] = useState<string>("");

    const signUpWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(password != confirmPassword){
            setErrorMsg("Passwords don't match");
        }
        const results = await signUpWithoutGoogle(email, password);
        (results.success ? router.push("/explore") : setErrorMsg(results.error));
    };

    const signUpWithGoogle = async () =>{
        if(password != confirmPassword){
            setErrorMsg("Passwords don't match");
        }
        
        const results = await signUpOrInWithGoogle();
        (results.success ? router.push("/explore") : setErrorMsg(results.error));
    }

    return (
        <main className="mb-40">
            <form onSubmit={signUpWithEmail} className="flex flex-col gap-10 w-1/3 mx-auto">
                <h1 className="text-5xl text-neonBlue text-center"> Welcome to Setfinder! </h1>
                <div className="inputContainer">
                    <label htmlFor="email" className="inputLabel">EMAIL:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inputField"
                        placeholder="Enter your email"
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="inputContainer">
                    <label htmlFor="password" className="inputLabel">PASSWORD:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`inputField ${password !== confirmPassword ? 'inputFieldInCorrect' : ''}`}
                        placeholder="Create a strong password"
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="inputContainer">
                    <label htmlFor="confirmPassword" className="inputLabel">CONFIRM PASSWORD:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`inputField ${password !== confirmPassword ? 'inputFieldInCorrect' : ''}`}
                        placeholder="Re-enter your password"
                        required
                        autoComplete="new-password"
                    />
                </div>
                
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                <button type="submit" className="ctaBtn"> Sign Up </button>
            </form> 

            <article onClick={signUpWithGoogle}
                className="inputField w-1/3 mx-auto my-10 flex flex-row items-center gap-5 justify-center hover:bg-gray-300 hover:text-black cursor-pointer">
                <FcGoogle className="text-2xl"/>
                <button className="text-xl"> Sign Up with Google </button>
            </article>
            
            <article className="flex gap-5 justify-center">
                <p> Already have an account? </p> 
                <Link href="/auth/login" className="underline"> Login </Link>
            </article>
        </main>
    );
}
