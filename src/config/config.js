require('dotenv').config(); // Load .env variables

module.exports = {
    PORT: process.env.PORT || 5001,
    MONGO_URI: process.env.MONGO_URI,
    REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
    REDIS_PORT: process.env.REDIS_PORT || 6380,
};
