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

    const signUp = async(platform: string) =>{
        let results;

        if(platform == "email"){
            results = await signUpWithoutGoogle(email, password);
        }else{
            results = await signUpOrInWithGoogle();
        }

        if(results.success){
            router.push("/explore");

            setTimeout(() => {
                window.location.reload();
            }, 300); 
        }else{
            setErrorMsg(results.error as string);
        }
    }

    return (
        <main className="mb-40">
            <form onSubmit={() =>{ signUp("email") }} className="authForm flex flex-col gap-10 w-1/3 mx-auto">
                <h1 className="text-4xl text-center leading-tight"> Welcome to Setfinder! </h1>
                <div className="inputContainer">
                    <label htmlFor="email" className="inputLabel">Email:</label>
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
                    <label htmlFor="password" className="inputLabel">Password:</label>
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
                    <label htmlFor="confirmPassword" className="inputLabel"> Confirm Password:</label>
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

            <article onClick={() =>{ signUp("google") }}
                className="googleBtn w-1/3 mx-auto my-10 flex flex-row items-center gap-5 justify-center hover:bg-gray-300 hover:text-black cursor-pointer">
                <FcGoogle className="text-2xl"/>
                <button className="text-xl font-semibold tracking-wider"> Sign Up with Google </button>
            </article>
            
            <article className="oldUser flex gap-5 justify-center tracking-wide">
                <p> Already have an account? </p> 
                <Link href="/auth/login" className="underline hover:opacity-80 font-semibold"> Login </Link>
            </article>
        </main>
    );
}
