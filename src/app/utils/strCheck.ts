import { SingleSet } from "@/types/setTypes";

// Checks for string and separates based on @ 
export function separateStr(strInput: string){
    const index = strInput.indexOf('@');
    if (index === -1) {
        return null;  // No '@' found
    }
    const part1 = strInput.substring(0, index);  // First part before '@'
    const part2 = strInput.substring(index + 1); // Second part after '@'
    return [part1, part2];
}
