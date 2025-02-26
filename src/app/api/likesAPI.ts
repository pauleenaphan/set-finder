import { deleteDoc, collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { getSoundCloudSets, getYoutubeSets } from "../api/setsAPI";

import { mergeAndRankSets } from "../utils/sets";

import { separateStr } from "../utils/strCheck";

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
        console.log("current doc id", id);

        const combinedStr = separateStr(id);

        if(combinedStr){
            const [firstPart, secondPart] = combinedStr;
            console.log("parts of string", firstPart, "", secondPart);

            // If first part length is 10, it's a SoundCloud ID
            if (firstPart.length === 10) {
                scList.push(firstPart);  
                ytList.push(secondPart); 
            } else {
                ytList.push(firstPart);  
                scList.push(secondPart); 
            }
        }else{
            (id.length === 10 ? scList : ytList).push(id);
        }
    });

    console.log("scList", scList);
    console.log("ytList", ytList);

    const scSets = await getSoundCloudSets(scList); // Await the result of the SoundCloud fetch
    const ytSets = await getYoutubeSets(ytList);    // Await the result of the YouTube fetch

    // const combinedSets = scSets.concat(ytSets);  
    const combinedSets = mergeAndRankSets(scSets, ytSets);

    console.log("getting likes", combinedSets);
    // return listOfLikes;

    return combinedSets;
    
};

// Check if the user likes a particular set to load a liked set
export const checkLike = async (setId: string, userUid: string) => {
    console.log("setId type:", setId);
    // passing in 1319257336
    // but in our likes it is 1319257336@YO4tNqhC5dc

    try {
        const docRef = doc(db, "users", userUid, "likes", String(setId));
        const docSnapshot = await getDoc(docRef);

        console.log("this is a userlike", setId)
        return docSnapshot.exists();

    } catch (error: unknown) {
        const err = error as AuthError; // Assert error as AuthError type
        console.error("Error checking if likes.setId doc exists", err.message);
        return false;
    }
};
