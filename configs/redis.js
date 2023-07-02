const redis = require("redis");

const redisClient = redis.createClient({
    url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) => {
    console.log("Redis Client Error", err)
    process.exit(1);
});
module.exports = redisClient;
