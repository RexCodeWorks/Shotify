import { NextApiRequest, NextApiResponse } from "next";

async function getYoutubeVideoInfo(videoUrl, apiKey) {
    const videoId = videoUrl.split("watch?v=")[1];
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`;
    console.log("apiUrl", apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items.length === 0) {
        return null;
    }

    return data.items[0];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { prompt } = req.query;
    const apiKey = process.env.YOUTUBE_API_KEY;

    try {
        const videoInfo = await getYoutubeVideoInfo(prompt, apiKey);

        if (!videoInfo) {
            return res.status(404).json({ message: "Video not found" });
        }

        return res.status(200).json(videoInfo);
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message, type: "Internal server error" });
    }
}
