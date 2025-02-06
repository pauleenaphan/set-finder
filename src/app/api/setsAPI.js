import { getOauth } from "./tokenAPI";

function formatDate(rawDate) {
    const dateObj = new Date(rawDate);

    return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short", // abbreviated month name (Jan, Feb, Mar, ...)
        day: "numeric"
    });
}

const upscaleImage = (url) => {
    // Assuming the URL is: https://i1.sndcdn.com/artworks-KwxyC70uiDfSwHn9-gvqplQ-large.jpg
    // Transform the image quality without needing the API key or secret
    return url.replace('-large', '-f_auto,q_auto,w_1000');
};

// Returns final list of live sets
export const fetchSets = async(setName) =>{
    // Checks if artist exist in edm base 
    if(await checkArtist(setName) == false){
        console.log("artist does not exist");
        return false;
    };

    // Checks if user input includes live set, if not then add it
    if (!setName.toLowerCase().includes("live") || !setName.toLowerCase().includes("live set")) {
        setName = setName + " live";
    } 

    console.log(setName);

    // gets set from soundcloud
    // let scSets = await getSoundCloudSets(setName);
    let ytSets = await getYoutubeSets(setName);

    // [platform (yt or sc), id, title of set, published date, link to set, thumbnail]
    // console.log("scsets", scSets);
    console.log("ytsets", ytSets);

    let listOfSets = [];

    // const maxLen = scSets.length + ytSets.length;
    const maxLen = 5;
    let scSets = [];

    // Loops through listOfSets to see if title exists yet
    const findSetByTitle = (title) => {
        return listOfSets.find(set => set.title === title);
    };

    for (let i = 0; i < maxLen; i++) {
        // Check and add YouTube sets
        if (ytSets[i]) {
            let existingSet = findSetByTitle(ytSets[i][2]);
            if (existingSet) {
                // If curr set with the same name exist then push it to the existing index
                existingSet.platforms.push({
                    platform: 'yt',
                    id: ytSets[i][1],
                    publishedDate: ytSets[i][3],
                    link: ytSets[i][4],
                    thumbnail: ytSets[i][5],
                });
            } else {
                // Else push the new set
                listOfSets.push({
                    title: ytSets[i][2],
                    platforms: [{
                        platform: 'yt',
                        id: ytSets[i][1],
                        publishedDate: ytSets[i][3],
                        link: ytSets[i][4],
                        thumbnail: ytSets[i][5],
                    }],
                });
            }
        }
    
        // Check and add SoundCloud sets
        if(scSets[i]){
            let existingSet = findSetByTitle(scSets[i][2]);
            if (existingSet){
                // If curr set with the same name exist then push it to the existing index
                existingSet.platforms.push({
                    platform: 'sc',
                    id: scSets[i][1],
                    publishedDate: scSets[i][3],
                    link: scSets[i][4],
                    thumbnail: scSets[i][5],
                });
            } else {
                // Else push new set 
                listOfSets.push({
                    title: scSets[i][2],
                    platforms: [{
                        platform: 'sc',
                        id: scSets[i][1],
                        publishedDate: scSets[i][3],
                        link: scSets[i][4],
                        thumbnail: scSets[i][5],
                    }],
                });
            }
        }
    }

    console.log(listOfSets);

    // Ranking function to calculate a "match score"
    const rankSets = (set) => {
        // If set.title contains the setName then calculate a match score, if it doesn't then set it to 0 
        const matchScore = set.title.toLowerCase().includes(setName.toLowerCase()) 
            ? set.title.toLowerCase().split(setName.toLowerCase()).length - 1
            : 0;
        
        return matchScore;
    };

    // Add match score to each set
    listOfSets.forEach(set => {
        set.matchScore = rankSets(set);
    });

    // Sort sets by match score in descending order
    let sortedLiveSets = listOfSets.sort((a, b) => b.matchScore - a.matchScore);

    console.log("Sorted live sets:", sortedLiveSets);

    return sortedLiveSets;
}

// find live sets from soundcloud
const getSoundCloudSets = async(setName) =>{
    console.log("client id", process.env.NEXT_PUBLIC_SOUNDCLOUD_ID);
    const oauthToken = await getOauth(); 
    console.log("oauthtoken", oauthToken);

    try{
        const response = await fetch(`https://api.soundcloud.com/tracks?q=${setName}&limit=1`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${oauthToken}`,  
            },

        });
        const data = await response.json();

        console.log("soundcloud", data)

        let setResults = [];

        for(let i = 0; i < data.length; i++){
            setResults[i] = [
                "sc", 
                data[i].id, 
                data[i].title, 
                formatDate(data[i].created_at), 
                data[i].permalink_url, 
                upscaleImage(data[i].artwork_url)
            ]
        }

        return setResults;

    }catch(error){
        console.error("Error catching live set");
    }
}

const getYoutubeSets = async(setName) =>{
    try{
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(setName)}&key=${process.env.NEXT_PUBLIC_YT_API_KEY}`)

        const data = await response.json();

        console.log("youtube data", data.items);

        let setResults = []

        for(let i = 0; i < data.items.length; i++){
            setResults[i] = [
                "yt", 
                data.items[i].id.videoId, 
                data.items[i].snippet.title, 
                formatDate(data.items[i].snippet.publishedAt), 
                `https://www.youtube.com/watch?v=${data.items[i].id.videoId}`,
                // Check if a max resolution for thumbnail exist, if not use the high res
                data.items[i].snippet.thumbnails.maxres ? data.items[i].snippet.thumbnails.maxres.url : data.items[i].snippet.thumbnails.high.url
            ]
        }

        return setResults;
    }catch(error){
        console.log("Error fetching youtube sets");
    }
}

// Checks whether or not an artist exist 
// Helps prevent users from search random things using the api from soundcloud and youtube
const checkArtist = async(artistName) =>{
    console.log("checking for artist");
    try{
        const response = await fetch(`https://musicbrainz.org/ws/2/artist/?query=artist:${artistName}&fmt=json`, {
            method: 'GET',
            headers: {
                'User-Agent': "Set-Finder/testing version (Pauleena2002@gmail.com)"
            },
        })

        const data = await response.json();

        console.log("this is artist data", data);
        if(data.artists){
            console.log("artist exist, returning true");
            console.log("dj name: ", data.artists[0].name);
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log("Error checking for artist", error);
        return error;
    }
}
