// app/api/getOauth/route.js

// Gets oauth token 
export async function POST(req) {
    console.log("GETTING OAUTH");

    const tokenUrl = 'https://api.soundcloud.com/oauth2/token';

    // Request body
    const body = new URLSearchParams({
        'client_id': process.env.NEXT_PUBLIC_SOUNDCLOUD_ID, 
        'client_secret': process.env.NEXT_PUBLIC_SECRET_ID,
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
            return new Response(JSON.stringify(data), { status: 200 }); // Return the token
        } else {
            console.error("SoundCloud API Error - Status:", response.status);
            console.error("SoundCloud API Error - Data:", data);
            return new Response(JSON.stringify({ error: 'Failed to get token' }), { status: 400 });
        }
    } catch (error) {
        console.error("Error getting Oauth:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
