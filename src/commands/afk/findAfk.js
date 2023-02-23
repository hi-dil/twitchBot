import db from "../../connection/db.js";
import Afk from "../../models/afk.js";
import FormatTime from "../../utils/formatTime.js";
import ReadCache from "./ReadCache.js";
import SetCache from "./setCache.js";

const FindAfk = async (client, channel, tags) => {
  const dbConn = await db();

  if (!dbConn) return
  const data = await Afk.findOne({ username: tags.username }).catch(err => console.log(err))

  if (!data) return

  const currentTime = new Date()
  const timePass = Math.abs(data.createdAt - currentTime)

  const convertedTime = FormatTime(timePass, 'millis')

  if (data.status === 'afk') client.say(channel, `${data.username} is back from afk: ${data.message} (${convertedTime})`)
  else if (data.status === 'gn') client.say(channel, `${data.username} is waking up GoodMorning : ${data.message} (${convertedTime})`)

  const remove = await Afk.findOneAndRemove({ username: tags.username }).catch(err => console.log(err))

  if (!remove) return
  const readCache = await ReadCache();
  const removeUser = readCache.activeAfk.filter(user => user !== tags.username)
  readCache.activeAfk = removeUser

  SetCache(readCache);
}

export default FindAfk;