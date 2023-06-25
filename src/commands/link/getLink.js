import db from "../../connection/db.js";
import Link from "../../models/dbmodels/link.js";

const GetLink = async (client, channel, message, tags) => {
  const dbConn = await db();
  if (!dbConn) return;

  //so there's 3 way to get link
  //1. if no argument, then will get random link from the channel
  //2. if provided username, then will get random link from the user in the channel
  //3. if provided username and channel, then get random link from the specific username and channel

  let dbLink;
  if (message.length === 1) {
    const query = { channel: channel };

    // get the model count
    const modelCount = await Link.count(query).catch((err) =>
      console.error(err)
    );
    const randomIndex = Math.floor(Math.random() * modelCount);

    dbLink = await Link.findOne(query)
      .skip(randomIndex)
      .catch((err) => console.error(err));
  } else if (message.length === 2) {
    const query = { username: message[1], channel: channel };

    // get the model count
    const modelCount = await Link.count(query).catch((err) =>
      console.error(err)
    );
    const randomIndex = Math.floor(Math.random() * modelCount);

    dbLink = await Link.findOne(query).skip(randomIndex).catch();
  } else {
    const queriedChannel = `#${message[2]}`;
    const query = { username: message[1], channel: queriedChannel };

    // get the model count
    const modelCount = await Link.count(query).catch((err) =>
      console.error(err)
    );
    const randomIndex = Math.floor(Math.random() * modelCount);

    dbLink = await Link.findOne(query).skip(randomIndex).catch();
  }

  if (!dbLink) return;
  client.say(channel, `${dbLink.message} - ${dbLink.username}ㅤ`);
};

export default GetLink;
