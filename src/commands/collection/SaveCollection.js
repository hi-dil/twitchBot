import Afk from "../../models/afk.js";
import db from "../../connection/db.js";

const SaveCollection = async () => {
  const dbConn = await db();

  if (!dbConn) return

  const afk = new Afk({
    username: 'bassnix',
    status: 'afk',
    message: 'docLeave'
  });

  const save = await afk.save().catch((error) => {
    console.log(error);
  })

}

export default SaveCollection;