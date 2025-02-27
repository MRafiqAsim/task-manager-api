const Redis = require("ioredis");
const { REDIS_HOST, REDIS_PORT,REDIS_URL, } = require("./config");
let redisClient;
if (REDIS_URL) 
{
    redisClient = new Redis(REDIS_URL, {
        tls: {} // Enable TLS/SSL for Azure Redis Cache
    });
}
else
{
     redisClient = new Redis({
        host: REDIS_HOST,
        port: REDIS_PORT
    });
}

redisClient.on("error", (err) => console.error("Redis error:", err));

module.exports = redisClient;
