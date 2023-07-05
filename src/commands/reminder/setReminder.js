import db from "../../connection/db.js";
import Reminder from "../../models/dbmodels/reminder.js";
import ReadRedis from "../../utils/redis/ReadRedis.js";
import WriteRedis from "../../utils/redis/WriteRedis.js";

const SetReminder = async (client, channel, message, tags) => {
  const rediskey = "activeReminder";
  const dbConn = await db();
  const targetuser = message[1].toLowerCase(0).replace("@", "");

  if (!dbConn) return;
  const filteredMessage = message.filter(
    (msg) => msg != message[0] && msg != message[1]
  );
  const reminderMessage = filteredMessage.join(" ");

  const setUserReminder = new Reminder({
    username: tags.username,
    message: reminderMessage,
    targetuser: targetuser,
    hassent: false,
  });

  const saveToDb = await setUserReminder.save().catch((error) => {
    console.log(error);
  });

  if (saveToDb) {
    client.say(channel, "Your reminder has been set");

    const readData = await ReadRedis(rediskey);
    readData.push(targetuser);
    WriteRedis(readData, rediskey);
  }
};

export default SetReminder;
