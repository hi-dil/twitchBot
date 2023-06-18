import redisConn from "../../connection/redis.js";

const ReadRedis = async (key) => {
  const redis = await redisConn();

  if (!redis) return;
  const readData = await redis.get(key);
  return JSON.parse(readData);
};

export default ReadRedis;
