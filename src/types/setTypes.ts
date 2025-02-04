export type PlatformData = {
    platform: string;
    id: string;
    publishedDate?: string;
    link: string;
    thumbnail?: string;
};

export type SetData = {
    title: string;
    platforms: PlatformData[];
};