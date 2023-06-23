import { NextApiRequest, NextApiResponse } from "next";
const QSTASH = process.env.QSTASH;
const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
const YOUTUBE_API_URL = process.env.YOUTUBE_API_URL;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const VERCEL_URL = "http://localhost:3000";

async function getYoutubeVideoInfo(videoUrl, apiKey) {
    const videoId = videoUrl.split("watch?v=")[1];
    const apiUrl = `${QSTASH}${YOUTUBE_API_URL}?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics&upstash-callback=${encodeURIComponent(VERCEL_URL + "/api/callback")}`;

    console.log("apiUrl", apiUrl);

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${QSTASH_TOKEN}`,
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();

    return { id: json.messageId };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { videoUrl } = req.query;

    console.log("videoUrl", videoUrl);

    try {
        const response = await getYoutubeVideoInfo(videoUrl, YOUTUBE_API_KEY);

        if (!response) {
            return res.status(404).json({ message: "Video not found" });
        }

        return res.status(202).json(response);
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message, type: "Internal server error" });
    }
}
