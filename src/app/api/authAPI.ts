import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, UserCredential, AuthError } from "firebase/auth";
import { auth, googleProvider, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

import { SignUpResponse, SignInResponse, GoogleSignInResponse } from "@/types/authTypes";

// Signing up without Google 
export const signUpWithoutGoogle = async (email: string, password: string): Promise<SignUpResponse> => {
    try {
        const userCred: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCred.user;

        await setDoc(doc(db, "users", newUser.uid), {
            email: email,
        });

        return { success: true };
    } catch (error: unknown) {
        const err = error as AuthError; // Assert error as AuthError type
        if (err.code === "auth/email-already-in-use") {
            return { success: false, error: "Email is already registered. Please log in." };
        }

        if (err.code === 'auth/weak-password') {
            return { success: false, error: "Password should be at least 6 characters long." };
        }

        console.error("Error Signing up", err.message);
        return { success: false, error: err.message };
    }
}

// Signing in without Google 
export const signInWithoutGoogle = async (email: string, password: string): Promise<SignInResponse> => {
    try {
        const userCred: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        const currUser = userCred.user;
        console.log("User has logged in", currUser);

        await setDoc(doc(db, "users", currUser.uid), {
            email: email,
        });

        return { success: true };
    } catch (error: unknown) {
        const err = error as AuthError; // Assert error as AuthError type
        if (err.code === 'auth/invalid-email' || err.code === 'auth/wrong-password') {
            return { success: false, error: "Incorrect email or password. Please try again." };
        }

        console.error("Error Logging in", err.message);
        return { success: false, error: err.message };
    }
}

// Signing up/in with Google 
export const signUpOrInWithGoogle = async (): Promise<GoogleSignInResponse> => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log("User has signed in/up with google", user);
        console.log(user.uid);

        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
        });

        return { success: true };
    } catch (error: unknown) {
        const err = error as AuthError; // Assert error as AuthError type
        console.error("Error signing in with Google", err);
        return { success: false, error: err.message };
    }
}
