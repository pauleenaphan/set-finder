// For yt and soundcloud imgs 
export type Thumbnail = {
    url: string;
    width: number;
    height: number;
};

// When user searches for a set 
export type PlatformData = {
    platform: string;
    id: string;
    publishedDate?: string;
    link: string;
    thumbnail?: string; // Can be either a string (URL) or an object with `url`, `width`, `height`
};

// Putting set data into firebase
export type SetData = {
    title: string;
    platforms: PlatformData[];
};

// User likes a set 
export interface LikeParams{
    setId: string;
    userUid: string;
}

// Getting the sets that users likes 
export type UserLikesParam = {
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
}