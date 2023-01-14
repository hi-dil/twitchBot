import mongoose from "mongoose";
import { Schema } from "mongoose";

const afkSchema = new Schema({
  username: String,
  status: String,
  message: String
}, { timestamps: true });

const Afk = mongoose.model('AfkStatus', afkSchema);

export default Afk;