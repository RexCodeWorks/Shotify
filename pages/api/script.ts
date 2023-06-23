import { NextApiRequest, NextApiResponse } from "next";
import fetchVideoInfo from "youtube-info";

async function getYoutubeVideoInfo(videoUrl) {
  const videoId = videoUrl.split("watch?v=")[1];
  const info = await fetchVideoInfo(videoId);
  return info;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.query;

  try {
    const videoInfo = await getYoutubeVideoInfo(prompt);

    console.log("videoInfo", videoInfo);

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
