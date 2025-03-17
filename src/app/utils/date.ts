// Formats a date string into "MMM DD, YYYY"
export function formatDate(rawDate: string | number | Date): string {
    const dateObj = new Date(rawDate);
    return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

// Returns format date in Jun 8, 2025
export const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    const today = new Date();
    return today.toLocaleDateString('en-US', options);
};