const axios = require("axios");

export class YouTubeAPI {
    constructor(private apiKey: string) { }

    async getVideoDetails(videoId: string) {
        try {
            const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${this.apiKey}`;

            const response = await axios.get(url);
            if (response.data.items.length === 0) {
                return null;
            }

            return {
                title: response.data.items[0].snippet.title,
                description: response.data.items[0].snippet.description,
            };
        } catch (error) {
            throw error;
        }
    }
}
