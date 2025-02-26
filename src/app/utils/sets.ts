// Any set related helper functions like checking for matching titles

import { RankedSet, SingleSet } from "@/types/setTypes";

// Function to merge and sort sets
export function mergeAndRankSets(scSets: SingleSet[], ytSets: SingleSet[], setName?: string): RankedSet[] {
    const listOfSets: RankedSet[] = [];

    // Normalize title for comparison
    const normalizeTitle = (title: string): string => {
        return title
            .toLowerCase()               // Convert to lowercase to handle case insensitivity
            .replace(/[@\-]/g, ' ')       // Replace @ and - with a space (you can choose to remove them)
            .replace(/[^\w\s]/gi, '')     // Remove all non-word and non-space characters
            .replace(/\s+/g, ' ')         // Replace multiple spaces with a single space
            .trim();                      // Trim leading/trailing spaces
    };

    // Function to find a set by normalized title
    const findSetByTitle = (title: string) => {
        const normalizedTitle = normalizeTitle(title);
        return listOfSets.find(set => normalizeTitle(set.title) === normalizedTitle);
    };

    // Merging sets while avoiding duplicates based on normalized titles
    [...scSets, ...ytSets].forEach(set => {
        const existingSet = findSetByTitle(set.title);
        if (existingSet) {
            existingSet.platforms.push(set);
        } else {
            listOfSets.push({ title: set.title, platforms: [set] });
        }
    });

    // If setName is provided, rank sets based on relevance
    if(setName) {
        const rankSets = (set: RankedSet): number => {
            return set.title.toLowerCase().includes(setName.toLowerCase())
                ? set.title.toLowerCase().split(setName.toLowerCase()).length - 1
                : 0;
        };

        // Assign and sort by match score
        listOfSets.forEach(set => (set.matchScore = rankSets(set)));
        return listOfSets.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    }

    // If no setName provided, return the list unsorted
    return listOfSets;
}
