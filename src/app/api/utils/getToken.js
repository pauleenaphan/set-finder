export const getToken = async () => {
    try{
        console.log("Fetching token..."); 
        const response = await fetch('/api/getOauth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log("Done fetching token", data.access_token);
        
        if (data.access_token) {
            console.log('Access Token:', data.access_token);
            return data.access_token;
        } else {
            console.log('Failed to get token');
        }
    }catch(error){
        console.log("Error fetching token", error);
    }
}
    