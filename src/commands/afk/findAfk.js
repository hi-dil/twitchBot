import db from "../../connection/db.js";
import Afk from "../../models/dbmodels/afk.js";
import FormatTime from "../../utils/formatTime.js";
import ReadRedis from "../../utils/redis/ReadRedis.js";
import WriteRedis from "../../utils/redis/WriteRedis.js";

const FindAfk = async (client, channel, tags) => {
  const rediskey = "afk";

  const dbConn = await db();
  if (!dbConn) return;
  const data = await Afk.findOne({ username: tags.username }).catch((err) =>
    console.log(err)
  );

  if (!data) return;

  const currentTime = new Date();
  const timePass = Math.abs(data.updatedAt - currentTime);

  const convertedTime = FormatTime(timePass, "millis");

  if (data.status === "afk")
    client.say(
      channel,
      `${data.username} is back from afk: ${data.message} (${convertedTime})`
    );
  else if (data.status === "gn")
    client.say(
      channel,
      `${data.username} is waking up GoodMorning : ${data.message} (${convertedTime})`
    );

  // remove the user from afk list in cache
  const afkList = await ReadRedis(rediskey);
  const removeUser = afkList.activeAfk.filter((user) => user !== tags.username);
  afkList.activeAfk = removeUser;

  WriteRedis(afkList, rediskey);
};

export default FindAfk;
