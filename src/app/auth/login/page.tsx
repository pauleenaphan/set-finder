"use client"

import Link from "next/link";

import { useState } from "react";

import "../../styles/auth.css";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ email, password }); // Handle login logic here
    };

    return (
        <main className="mb-40">
            <form onSubmit={handleSubmit}
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
                    />
                </div>
                
                <button type="submit" className="ctaBtn"> Login </button>
                <div className="flex gap-5 justify-center">
                    <p> New User? </p> 
                    <Link href="/auth/signup" className="underline"> Create an Account </Link>
                </div>
                
                
            </form>
        </main>
        
    );
}