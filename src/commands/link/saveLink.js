import db from "../../connection/db.js";
import Link from "../../models/dbmodels/link.js";

const SaveLink = async (client, channel, message, tags) => {
  const dbConn = await db();
  if (!dbConn) return;

  const setLink = new Link({
    username: tags.username,
    message: message,
    channel: channel,
  });

  const saveToDb = await setLink.save().catch((error) => {
    console.log(error);
  });

  if (saveToDb) console.log(`link from ${tags.username} has been saved`);
};

export default SaveLink;
