import { ChatbotAPI } from "./chatbotAPI";
import { YouTubeAPI } from "./youTubeAPI";

// Initialize Chatbot and YouTube API instances
const chatbot = new ChatbotAPI(process.env.OPENAI_API_KEY);
const youtube = new YouTubeAPI(process.env.YOUTUBE_API_KEY);

export default async function fetchVideoScript(url: string): Promise<string | null> {
  try {
    // Fetch the video ID from the provided URL
    const videoId = extractVideoId(url);

    // Use the YouTube API to fetch video details
    const videoDetails = await youtube.getVideoDetails(videoId);

    if (!videoDetails) {
      throw new Error("Invalid video URL");
    }

    // Use the Chatbot API to generate the script
    const prompt = `Fetch the script for the YouTube video titled "${videoDetails.title}"`;
    const scriptResponse = await chatbot.generateText(prompt);

    return scriptResponse;
  } catch (error) {
    throw error;
  }
}

// Function to extract video ID from a YouTube URL
function extractVideoId(url: string) {
  const videoIdMatches = url.match(/(?:v=|be\/|v\/)([\w-_]{11})/);
  return videoIdMatches ? videoIdMatches[1] : null;
}
