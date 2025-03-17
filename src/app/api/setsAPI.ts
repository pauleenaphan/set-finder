import { getOauth } from "./tokenAPI";
import { formatDate } from "../utils/date";
import { SingleSet, YouTubeSet, SoundCloudSet } from "@/types/setTypes";

import { mergeAndRankSets } from "../utils/sets";

import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Fetches live sets from SoundCloud and YouTube, then ranks and returns them
export const fetchSets = async (setName: string) => {
    if (!(await checkArtist(setName))) {
        console.log("Artist does not exist");
        return false;
    }

    // Ensure "live" or "live set" is included in the search term
    if (!setName.toLowerCase().includes("live") && !setName.toLowerCase().includes("live set")) {
        setName += " live";
    }

    console.log("Updated search query:", setName);

    // Fetch SoundCloud & YouTube sets
    const scSets: SingleSet[] = await getSoundCloudSets(setName);
    const ytSets: SingleSet[] = await getYoutubeSets(setName);

    console.log("SoundCloud Sets:", scSets);
    console.log("YouTube Sets:", ytSets);

    const sortedLiveSets = mergeAndRankSets(scSets, ytSets, setName);

    console.log("Sorted live sets:", sortedLiveSets);
    return sortedLiveSets;
};

// Fetch SoundCloud sets
export const getSoundCloudSets = async (setNameOrList: string | string[]) => {
    console.log("Client ID:", process.env.NEXT_PUBLIC_SOUNDCLOUD_ID);
    const oauthToken = await getOauth();
    console.log("OAuth Token:", oauthToken);

    if(typeof setNameOrList === "string"){
        try {
            const response = await fetch(`https://api.soundcloud.com/tracks?q=${setNameOrList}&limit=10`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${oauthToken}` },
            });

            if (!response.ok) throw new Error("Failed to fetch SoundCloud sets");

            const data = await response.json();
            console.log("SoundCloud Data from get SC Sets:", data);

            return data.map((track: SoundCloudSet) => ({
                platform: "sc",
                id: track.id.toString(),
                title: track.title,
                publishedDate: formatDate(track.created_at),
                link: track.permalink_url,
                thumbnail: track.artwork_url ? track.artwork_url.replace(/large/, 't500x500') : null,
            }));
        } catch (error) {
            console.error("Error fetching SoundCloud sets:", error);
            return [];
        }
    }else{
        try {
            // Fetch each track by its ID from the array and return the formatted result
            const trackDetails = await Promise.all(setNameOrList.map(async (id: string) => {
                const response = await fetch(`https://api.soundcloud.com/tracks/${id}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${oauthToken}` },
                });

                if (!response.ok) throw new Error(`Failed to fetch track with ID ${id}`);

                const track = await response.json();
                return {
                    platform: "sc",
                    id: track.id.toString(),
                    title: track.title,
                    publishedDate: formatDate(track.created_at),
                    link: track.permalink_url,
                    thumbnail: track.artwork_url ? track.artwork_url.replace(/large/, 't500x500') : null,
                };
            }));

            return trackDetails;  // Returns the array of track details for all IDs
        } catch (error) {
            console.error("Error fetching SoundCloud tracks:", error);
            return [];
        }
    }
    
};

// Fetch YouTube sets
export const getYoutubeSets = async (setNameOrList: string | string[]) => {

    if(typeof setNameOrList === "string"){
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(setNameOrList)}&key=${process.env.NEXT_PUBLIC_YT_API_KEY}`
            );

            if (!response.ok) throw new Error("Failed to fetch YouTube sets");

            const data = await response.json();
            console.log("YouTube Data from get YT sets:", data.items);

            return data.items.map((item: YouTubeSet) => ({
                platform: "yt",
                id: item.id.videoId,
                title: item.snippet.title,
                publishedDate: formatDate(item.snippet.publishedAt),
                link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high.url,
            }));
        } catch (error) {
            console.error("Error fetching YouTube sets:", error);
            return [];
        }
    }else{
        try {
            const videoDetailsPromises = await Promise.all(setNameOrList.map(async (id: string) => {
                console.log("current youtube id request", id);
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${process.env.NEXT_PUBLIC_YT_API_KEY}`
                );

                if (!response.ok) throw new Error("Failed to fetch YouTube video details");

                const data = await response.json();
                const item = data.items[0];

                if (!data.items || data.items.length === 0) {
                    console.error(`No video details found for ID: ${id}`);
                    return null; // or handle the error gracefully, such as returning an empty object
                }

                return {
                    platform: "yt",
                    id: item.id,
                    title: item.snippet.title,
                    publishedDate: formatDate(item.snippet.publishedAt),
                    link: `https://www.youtube.com/watch?v=${item.id}`,
                    thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high.url,
                };
            }));

            
            return videoDetailsPromises;
        } catch (error) {
            console.error("Error fetching YouTube video details:", error);
            return [];
        }
    }
    
};

// Checks if an artist exists using the MusicBrainz API
const checkArtist = async (artistName: string) => {
    console.log("Checking for artist:", artistName);

    try {
        const response = await fetch(`https://musicbrainz.org/ws/2/artist/?query=artist:${artistName}&fmt=json`, {
            method: 'GET',
            headers: { 'User-Agent': "Set-Finder/testing version (Pauleena2002@gmail.com)" },
        });

        if (!response.ok) throw new Error("Failed to check artist");

        const data = await response.json();
        console.log("Artist Data:", data);

        if (data.artists && data.artists.length > 0) {
            console.log("Artist exists:", data.artists[0].name);
            return true;
        }
    } catch (error) {
        console.error("Error checking for artist:", error);
    }

    return false;
};


// Grab updated new sets data
export const fetchWeeklyNewSets = async () =>{
    console.log("fetching weekly new sets");

    try{
        const docSnap = await getDoc(doc(db, "live_sets", "YTNewestSets"));

        return docSnap.exists()
        ? Object.values(docSnap.data()?.ytNewestSets || {}) as SingleSet[] // Type cast here
        : [];
        // TODO: grab new sets from soundcloud and merge/organize them 
        // TODO: return them as Setdata
    }catch(error){
        console.error("Error fetching weekly sets", error);
        return [];
    }
}

export const fetchWeeklyTrendingSets = async () =>{
    console.log("fetching weekly trending sets");

    try{
        const docSnap = await getDoc(doc(db, "live_sets", "YTTrendingSets"));

        return docSnap.exists()
        ? Object.values(docSnap.data()?.ytTrendingSets || {}) as SingleSet[] // Type cast here
        : [];

    }catch(error){
        console.error("Error fetching weekly sets", error);
        return [];
    }
}