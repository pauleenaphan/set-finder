import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";

// Signing up without google 
export const signUpWithoutGoogle = async (email, password) =>{
    try{
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCred.user;

        console.log("new user has signed up", newUser);

        // When new account is sucessful add it to mongo db 
        return { success: true };
    }catch(error){
        if (error.code === "auth/email-already-in-use") {
            return { success: false, error: "Email is already registered. Please log in." };
        }

        if (error.code === 'auth/weak-password') {
            return { success: false, error: "Password should be at least 6 characters long." };
        }

        console.error("Error Signing up", error.message);
        return { success: false, error: error.message };
    }
}

// Signing in without google 
export const signInWithoutGoogle = async (email, password) =>{
    try{
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const currUser = userCred.user;
        console.log("User has logged in ", currUser);

        // Also double check if user is in mongodb db
        return { success: true };
    }catch(error){
        if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
            return { success: false, error: "Incorrect email or password. Please try again." };
        }
        
        console.error("Error Logging in", error.message);
        return { success: false, error: error.message };
    }
}

// Signing up/in with google 
export const signUpOrInWithGoogle = async() =>{
    try{
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log("User has signed in/up with google");

        // Check if user is in mongo db if not then add their id 

        return { success: true };
    }catch(error){
        console.error("Error signing in with Google", error);
        return { success: false, error: error.message };
    }
}