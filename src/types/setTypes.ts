export type Thumbnail = {
    url: string;
    width: number;
    height: number;
};

export type PlatformData = {
    platform: string;
    id: string;
    publishedDate?: string;
    link: string;
    thumbnail?: string; // Can be either a string (URL) or an object with `url`, `width`, `height`
};

export type SetData = {
    title: string;
    platforms: PlatformData[];
};