// For yt and soundcloud imgs 
export type Thumbnail = {
    url: string;
    width: number;
    height: number;
};

// When user searches for a set 
export interface PlatformData{
    platform: string;
    id: string;
    publishedDate?: string;
    link: string;
    thumbnail?: string; // Can be either a string (URL) or an object with `url`, `width`, `height`
};

// Putting set data into firebase
export interface SetData{
    title: string;
    platforms: PlatformData[];
};

// User likes a set 
export interface LikeParams{
    setId: string;
    userUid: string;
}

// Getting the sets that users likes 
export interface UserLikesParam{
    id: string;
    link: string;
    platform: string;
    thumbnail: string;
    publishedDate: string;
    title: string;
}

// Getting list of set cards props 
export interface SetListProps {
    status: string;
    setResults: SetData[] | UserLikesParam[];
    likedSets: Record<string, boolean>;
    handleLikeStatus: (id: string, liked: boolean) => void;
    style: string;
}

// Single set 
export interface SingleSet {
    platform: string;
    id: string;
    title: string;
    publishedDate: string;
    link: string;
    thumbnail: string;
}

// Organized sets
export interface RankedSet {
    title: string;
    platforms: SingleSet[];
    matchScore?: number;
}

export interface YouTubeSet{
    id: { videoId: string };
    snippet: {
        title: string;
        publishedAt: string;
        thumbnails: {
            maxres?: { url: string };
            high: { url: string };
        };
    };
}

export interface SoundCloudSet{
    id: string | number; // ID could be a string or number
    title: string;
    created_at: string;
    permalink_url: string;
    artwork_url?: string; // Optional property
}