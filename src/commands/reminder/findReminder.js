import db from "../../connection/db.js";
import Reminder from "../../models/dbmodels/reminder.js";
import FormatTime from "../../utils/formatTime.js";
import ReadRedis from "../../utils/redis/ReadRedis.js";
import WriteRedis from "../../utils/redis/WriteRedis.js";

const FindReminder = async (client, channel, tags) => {
  const rediskey = "activeReminder";
  const targetuser = tags.username.toLowerCase();

  const dbConn = await db();
  if (!dbConn) return;
  const datum = await Reminder.find({
    targetuser: targetuser,
    hassent: false,
  }).catch((err) => console.log(err));

  if (!datum) return;

  let reminderMessage = "";
  datum.forEach((data, index) => {
    if (index === datum.length) {
      reminderMessage = reminderMessage.concat(
        `${data.username}: ${data.message}`
      );
    } else {
      reminderMessage = reminderMessage.concat(
        `${data.username}: ${data.message}, `
      );
    }

    data.hassent = true;
  });

  if (datum.length === 1) {
    client.say(
      channel,
      `${tags.username} you have a reminder from:- ${reminderMessage}`
    );
  } else {
    client.say(
      channel,
      `${tags.username} you have reminders from:- ${reminderMessage}`
    );
  }

  // mark reminder as complete in db
  var updatedb = await Reminder.updateMany(
    { targetuser: targetuser, hassent: false },
    { $set: { hassent: true } }
  );

  //remove the target user from active reminder list in cache
  let activeReminder = await ReadRedis(rediskey);
  const removeUser = activeReminder.filter((user) => user !== targetuser);
  activeReminder = removeUser;
  WriteRedis(activeReminder, rediskey);
};

export default FindReminder;
