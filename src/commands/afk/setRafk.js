import db from "../../connection/db.js";
import Afk from "../../models/dbmodels/afk.js";
import ReadRedis from "../../utils/redis/ReadRedis.js";
import WriteRedis from "../../utils/redis/WriteRedis.js";

const setRafk = async (client, channel, message, tags) => {
  const rediskey = "afk";

  const dbConn = await db();
  if (!dbConn) return;

  // first see if user is currently in active afk list or not
  // const afkList = await ReadRedis(rediskey);
  // const findUser = afkList.activeAfk.find((user) => user === tags.username);
  //
  // if (findUser !== null) return;

  // then check if the get the user details from afk db
  const filter = { username: tags.username };
  const data = await Afk.findOne(filter).catch((err) => console.log(err));

  if (!data) return;

  // check if the time pass is more that 5 minutes or not
  const currentTime = new Date();
  const timePass = Math.abs(data.activetime - currentTime);

  if (timePass <= 300000) {
    client.say(channel, "Your afk has been resumed");

    const readData = await ReadRedis(rediskey);
    readData.activeAfk.push(tags.username.toString());
    WriteRedis(readData, rediskey);
  } else {
    client.say(
      channel,
      "Your afk has been expired(more than 5 minutes from last afk)"
    );
  }
};

export default setRafk;
