import db from "../../connection/db.js";
import Afk from "../../models/afk.js";
import SetCache from "./setCache.js";
import ReadCache from "./ReadCache.js";

const setAfk = async (client, channel, message, tags) => {
  const dbConn = await db();
  const afkStatus = message[0].toLowerCase();

  if (!dbConn) return
  const filteredMessage = message.filter(msg => msg != message[0])
  const afkMessage = filteredMessage.join(" ");

  const setAfk = new Afk({
    username: tags.username,
    status: afkStatus,
    message: afkMessage
  });

  const saveToDb = await setAfk.save().catch((error) => {
    console.log(error);
  })

  if (saveToDb) {
    if (afkStatus === 'afk') client.say(channel, `${tags.username} is ${message[0]}: ${afkMessage}`)
    else if (afkStatus === 'gn') client.say(channel, `${tags.username} is sleeping Bedge : ${afkMessage}`)

    const readData = await ReadCache();
    readData.activeAfk.push(tags.username.toString());
    SetCache(readData)
  }
}

export default setAfk;