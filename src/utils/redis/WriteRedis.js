import redisConn from "../../connection/redis.js";

const WriteRedis = async (data, key) => {
  const redis = await redisConn();

  if (!redis) return;
  const saveData = JSON.stringify(data);
  return await redis.set(key, saveData);
};

export default WriteRedis;
