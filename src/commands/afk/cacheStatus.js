import Afk from "../../models/afk.js";
import db from "../../connection/db.js";
import ReadRedis from "../../utils/redis/ReadRedis.js";
import WriteRedis from "../../utils/redis/WriteRedis.js";

const CacheStatus = async () => {
  const rediskey = "afk";
  const dbConn = await db();

  if (!dbConn) return;

  const getStatuses = await Afk.find().catch((error) => {
    console.log(error);
  });

  const afkList = [];
  getStatuses.map((status) => afkList.push(status.username));

  const readData = await ReadRedis(rediskey);
  readData.activeAfk = afkList;
  await WriteRedis(readData, rediskey);
};

export default CacheStatus;
