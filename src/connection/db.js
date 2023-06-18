import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const db = async () => {
  const uri = process.env.MONGO_URI;
  mongoose.set("strictQuery", false);
  const dbConn = await mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err) => console.log(err));
  return dbConn;
};

export default db;
