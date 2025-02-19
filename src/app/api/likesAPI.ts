import { deleteDoc, collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { getSoundCloudSets, getYoutubeSets } from "../api/setsAPI";

// Define the error type for Firebase errors
import { AuthError } from "firebase/auth";

// Add like into firebase if user likes a set
export const addLike = async  (setId: string, userUid: string) => {
    try {
        await setDoc(doc(db, "users", userUid, "likes", String(setId)), {
            liked: true,
        });

        console.log(setId, "has been liked");
    } catch (error: unknown) {
        const err = error as AuthError; // Assert error as AuthError type
        console.error("Error liking set", err.message);
    }
};

// Remove like from firebase is user dislikes a set
export const removeLike = async  (setId: string, userUid: string) => {
    try {
        await deleteDoc(doc(db, "users", userUid, "likes", setId));
        console.log(setId, "has been removed from liked");

    } catch (error: unknown) {
        const err = error as AuthError; // Assert error as AuthError type
        console.error("Error removing set from likes", err.message);
    }
};

// Display users likes
export const getLikes = async (userUid: string) => {
    // grab list of id from firebase
    const likes = await getDocs(collection(db, "users", userUid, "likes"));

    const scList: string[] = [];
    const ytList: string[] = [];

    // Process likes in one loop
    likes.forEach((doc) => {
        const id = doc.id;
        (id.length === 10 ? scList : ytList).push(id);
    });

    const scSets = await getSoundCloudSets(scList); // Await the result of the SoundCloud fetch
    const ytSets = await getYoutubeSets(ytList);    // Await the result of the YouTube fetch

    let combinedSets = scSets.concat(ytSets);  

    console.log("getting likes", combinedSets);
    // return listOfLikes;

    return combinedSets;
    
};

// Check if the user likes a particular set to load a liked set
export const checkLike = async (setId: string, userUid: string) => {
    console.log("setId type:", typeof setId, "userUid type:", typeof userUid);

    try {
        const docRef = doc(db, "users", userUid, "likes", String(setId));
        const docSnapshot = await getDoc(docRef);

        return docSnapshot.exists();

    } catch (error: unknown) {
        const err = error as AuthError; // Assert error as AuthError type
        console.error("Error checking if likes.setId doc exists", err.message);
        return false;
    }
};
