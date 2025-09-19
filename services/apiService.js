const axios = require("axios");
require("dotenv").config();

const callAPI = async (action) => {
  try {
    switch (action.toLowerCase()) {
      case "weather": {
        const city = "Delhi";
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const res = await axios.get(url);
        return `Sunny in ${city}, ${res.data.main.temp}°C`; // ✅ Clean format
      }

      case "news": {
        const apiKey = process.env.NEWS_API_KEY;
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

        const res = await axios.get(url);
        const headline = res.data.articles[0]?.title || "No news found";
        return `Top headline: ${headline}`; // ✅ Clear & direct
      }

      case "github": {
        const url = "https://api.github.com/search/repositories?q=stars:>50000&sort=stars";
        const res = await axios.get(url);
        const topRepo = res.data.items[0]?.full_name || "No repo found";
        return `Trending repo: ${topRepo}`; // ✅ Clean
      }

      default:
        return "No API response available";
    }
  } catch (err) {
    console.error("API Error:", err.message);
    return "Error fetching data from API";
  }
};

module.exports = { callAPI };
