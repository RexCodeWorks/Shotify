import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../utils/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the "id" parameter from the request query
  const { id }: any = req.query;

  try {
    // Fetch data from Redis using the provided "id"
    const data = await redis.get(id);
    console.log("id", id);
    console.log("data", data);
    if (!data) {
      // If no data is found, return a 404 status with a message
      return res.status(404).json({ message: "No data found" });
    } else {
      // If data is found, return a 200 status with the data
      return res.status(200).json(data);
    }
  } catch (error) {
    // If an error occurs, return a 500 status with the error message
    return res.status(500).json({ message: error.message });
  }
}
