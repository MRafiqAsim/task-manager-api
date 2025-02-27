const Redis = require("ioredis");
const { REDIS_HOST, REDIS_PORT } = require("./config");

const redisClient = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT
});

redisClient.on("error", (err) => console.error("Redis error:", err));

module.exports = redisClient;
