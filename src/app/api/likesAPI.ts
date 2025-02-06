import { deleteDoc, addDoc, collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { LikeParams } from "@/types/setTypes";

// Define the error type for Firebase errors
import { AuthError } from "firebase/auth";

// Add a like for a set
export const addLike = async  (setId: string, userUid: string) => {
    try {
        await setDoc(doc(db, "users", userUid, "likes", setId), {
            liked: true,
        });

        console.log(setId, "has been liked");
    } catch (error: unknown) {
        const err = error as AuthError; // Assert error as AuthError type
        console.error("Error liking set", err.message);
    }
};

// Remove a like for a set
export const removeLike = async  (setId: string, userUid: string) => {
    try {
        await deleteDoc(doc(db, "users", userUid, "likes", setId));
        console.log(setId, "has been removed from liked");

    } catch (error: unknown) {
        const err = error as AuthError; // Assert error as AuthError type
        console.error("Error removing set from likes", err.message);
    }
};

// Get the likes (empty implementation for now)
export const getLikes = async (userUid: string) => {
    let listOfLikes: string[] = [];
    // grab list of id from firebase
    const likes = await getDocs(collection(db, "users", userUid, "likes"));

    likes.forEach((doc) =>{
        listOfLikes.push(doc.id);
    })

    console.log("list of likes", listOfLikes);
    return listOfLikes;
    
    // input id into yt and sc api
    // yt and sc api display liked sets
};

// Check if the user likes a particular set
export const checkLike = async (setId: string, userUid: string) => {
    console.log("curr useruid", userUid, " set id", setId);

    try {
        const docRef = doc(db, "users", userUid, "likes", setId);
        const docSnapshot = await getDoc(docRef);

        return docSnapshot.exists();

    } catch (error: unknown) {
        const err = error as AuthError; // Assert error as AuthError type
        console.error("Error checking if likes.setId doc exists", err.message);
        return false;
    }
};
