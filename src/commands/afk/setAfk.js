import db from "../../connection/db.js";
import Afk from "../../models/dbmodels/afk.js";
import ReadRedis from "../../utils/redis/ReadRedis.js";
import WriteRedis from "../../utils/redis/WriteRedis.js";

const setAfk = async (client, channel, message, tags) => {
  const rediskey = "afk";
  const dbConn = await db();
  const afkStatus = message[0].toLowerCase();

  if (!dbConn) return;
  const filteredMessage = message.filter((msg) => msg != message[0]);
  const afkMessage = filteredMessage.join(" ");

  // then check if the get the user details from afk db
  const filter = { username: tags.username };
  const findUser = await Afk.findOne(filter).catch((err) => console.log(err));

  let saveToDb;
  if (!findUser) {
    const setAfk = new Afk({
      username: tags.username,
      status: afkStatus,
      message: afkMessage,
      afktime: new Date(),
      activetime: new Date(),
    });

    saveToDb = await setAfk.save().catch((error) => {
      console.log(error);
    });
  } else {
    const update = {
      status: afkStatus,
      message: afkMessage,
      afktime: new Date(),
    };
    saveToDb = await Afk.findOneAndUpdate(filter, update).catch((err) =>
      console.log(err)
    );
  }

  if (saveToDb) {
    if (afkStatus === "afk" && afkMessage)
      client.say(channel, `${tags.username} is ${message[0]}: ${afkMessage}`);
    else if (afkStatus === "gn" && afkMessage)
      client.say(channel, `${tags.username} : GoodNight . o O ( ${afkMessage} )`);
    else if (afkStatus === "afk" && !afkMessage)
      client.say(channel, `${tags.username} is ${message[0]}`);
    else if (afkStatus === "gn" && !afkMessage)
      client.say(channel, `${tags.username} is sleeping Bedge`);

    const readData = await ReadRedis(rediskey);
    readData.activeAfk.push(tags.username.toString());
    WriteRedis(readData, rediskey);
  }
};

export default setAfk;
