"use client"

import Link from "next/link";
import { useRouter } from 'next/navigation';

import { useState } from "react";

import "../../styles/auth.css";

import { FcGoogle } from "react-icons/fc";

import { signInWithoutGoogle, signUpOrInWithGoogle } from "../../api/authAPI";

export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [errorMsg, setErrorMsg] = useState<string>("");

    const signIn = async(platform: string) =>{
        let results;

        if(platform == "email"){
            results = await signInWithoutGoogle(email, password);
        }else{
            results = await signUpOrInWithGoogle();
        }

        if(results.success){
            router.push("/explore");

            setTimeout(() => {
                window.location.reload();
            }, 150); 
        }else{
            setErrorMsg(results.error as string);
        }
    }

    return (
        <main className="mb-40">
            <form onSubmit={() => { signIn("email") }}
                className="flex flex-col gap-10 w-1/3 mx-auto">
                <h1 className="text-5xl text-neonBlue text-center"> Welcome Back!</h1>
                <div className="inputContainer">
                    <label htmlFor="email" className="inputLabel">EMAIL:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inputField"
                        placeholder="Enter your email"
                        autoComplete="email"
                    />
                </div>
                
                <div className="inputContainer">
                    <label htmlFor="password" className="inputLabel">PASSWORD: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="inputField"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                    />
                </div>
                
                {errorMsg && <p className="text-red-500"> {errorMsg} </p>}
                <button type="submit" className="ctaBtn"> Login </button>
            </form>

            <article onClick={() =>{ signIn("google") }}
                className="inputField w-1/3 mx-auto my-10 flex flex-row items-center gap-5 justify-center hover:bg-gray-300 hover:text-black cursor-pointer">
                <FcGoogle className="text-2xl"/>
                <button className="text-xl"> Sign in with Google </button>
            </article>
            
            <div className="flex gap-5 justify-center">
                <p> New User? </p> 
                <Link href="/auth/signup" className="underline"> Create an Account </Link>
            </div>
        </main>
        
    );
}