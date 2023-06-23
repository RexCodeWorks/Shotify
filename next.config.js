module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["oaidalleapiprodscus.blob.core.windows.net"],
  },  
};

// next.config.js
module.exports = {
  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY, // Add this line
  },
};
