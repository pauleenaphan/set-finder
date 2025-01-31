import { getToken } from "./getToken";

// gets live sets 
export const fetchSets = async(setName) =>{
    console.log("client id", process.env.NEXT_PUBLIC_SOUNDCLOUD_ID);
    const oauthToken = await getToken(); 
    console.log("oauthtoken", oauthToken);

    // gets set from soundcloud
    try{
        const response = await fetch(`https://api.soundcloud.com/tracks?q=${setName}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${oauthToken}`,  
            },

        });
        const data = await response.json();

        console.log("data", data)

        let setResults = [];

        for(let i = 0; i < data.length; i++){
            setResults[i] = [data[i].title, data[i].permalink_url]
        }

        console.log("set results", setResults);
        return setResults;
    }catch(error){
        console.error("Error catching live set");
    }
}
