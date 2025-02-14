// Formats a date string into "MMM DD, YYYY"
export function formatDate(rawDate: string | number | Date): string {
    const dateObj = new Date(rawDate);
    return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}