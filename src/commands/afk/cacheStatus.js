import Afk from "../../models/afk.js";
import db from "../../connection/db.js";
import SetCache from "./setCache.js";
import ReadCache from "./ReadCache.js";

const CacheStatus = async () => {
  const dbConn = await db();

  if (!dbConn) return

  const getStatuses = await Afk.find().catch((error) => {
    console.log(error);
  })

  const afkList = [];
  getStatuses.map(status => afkList.push(status.username))

  const readData = await ReadCache();
  readData.activeAfk = afkList
  SetCache(readData)
}

export default CacheStatus;