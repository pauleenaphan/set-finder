import {onSchedule} from 'firebase-functions/v2/scheduler';
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
dotenv.config();

admin.initializeApp();
const db = admin.firestore();

/**
 * Formats a given date to the "MM/DD/YYYY" format.
 *
 * @param {string | number | Date} rawDate - The raw date to be formatted.
 * @return {string} The formatted date string.
 */
function formatDate(rawDate: string | number | Date): string {
  const dateObj = new Date(rawDate);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const fetchLiveEDMSets = onSchedule("every sunday 00:00", async () => {
  logger.info("Fetching new EDM live sets...");

  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

  try {
    // Gets newest YouTube sets
    const ytNewestSetsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=live%20EDM%20set&maxResults=10&type=video&order=date&publishedAfter=${firstDayOfMonth}&key=${process.env.YT_API_KEY}`
    );
    const ytNewestSetsData = await ytNewestSetsResponse.json();

    const ytNewestSets = ytNewestSetsData.items.map(
      (item: unknown) => ({
        platform: "yt",
        id: (item as { id: { videoId: string } }).id.videoId,
        title: (item as { snippet: { title: string } }).snippet.title,
        publishedDate: formatDate(
          (item as { snippet: { publishedAt: string } }).snippet.publishedAt
        ),
        link: `https://www.youtube.com/watch?v=${(item as { id: { videoId: string } }).id.videoId}`,
        thumbnail:
          (item as { snippet: { thumbnails: { maxres?: { url: string } } } }).
            snippet.thumbnails.maxres?.url ||
          (item as { snippet: { thumbnails: { high: { url: string } } } }).
            snippet.thumbnails.high.url,
      })
    );

    const ytNewSetsRef = db.collection("live_sets").doc("YTNewestSets");
    await ytNewSetsRef.set({ytNewestSets});

    // Gets trending YouTube sets
    const ytTrendingSetsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=live%20EDM%20set&maxResults=10&type=video&order=rating&key=${process.env.YT_API_KEY}`
    );

    const ytTrendingSetsData = await ytTrendingSetsResponse.json();

    const ytTrendingSets = ytTrendingSetsData.items.map(
      (item: unknown) => ({
        platform: "yt",
        id: (item as { id: { videoId: string } }).id.videoId,
        title: (item as { snippet: { title: string } }).snippet.title,
        publishedDate: formatDate(
          (item as { snippet: { publishedAt: string } }).snippet.publishedAt
        ),
        link: `https://www.youtube.com/watch?v=${(item as { id: { videoId: string } }).id.videoId}`,
        thumbnail:
          (item as { snippet: { thumbnails: { maxres?: { url: string } } } }).
            snippet.thumbnails.maxres?.url ||
          (item as { snippet: { thumbnails: { high: { url: string } } } }).
            snippet.thumbnails.high.url,
      })
    );

    const ytTrendingSetsRef = db.collection("live_sets").doc("YTTrendingSets");
    await ytTrendingSetsRef.set({ytTrendingSets});

    logger.info("Fetched Sets:", ytNewestSets);
    logger.info("Fetched Sets:", ytTrendingSets);

    logger.info("Live sets updated in Firestore!");
  } catch (error) {
    logger.error("Error fetching live sets:", error);
  }
});
