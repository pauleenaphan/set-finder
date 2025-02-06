// Gets oauth token for SoundCloud API
export async function getOauth() {
    console.log("GETTING OAUTH");

    const tokenUrl = 'https://api.soundcloud.com/oauth2/token';

    // Request body
    const body = new URLSearchParams({
        'client_id': process.env.NEXT_PUBLIC_SOUNDCLOUD_ID as string, 
        'client_secret': process.env.NEXT_PUBLIC_SECRET_ID as string,
        grant_type: 'client_credentials',
    });

    try {
        // Make the request to SoundCloud API
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Access Token:', data.access_token);
            return data.access_token; // Return the access token
        } else {
            console.error("SoundCloud API Error - Status:", response.status);
            console.error("SoundCloud API Error - Data:", data);
            throw new Error('Failed to get token');
        }
    } catch (error) {
        console.error("Error getting Oauth:", error);
        throw new Error('Internal Server Error');
    }
}
