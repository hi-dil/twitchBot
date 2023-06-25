import mongoose from "mongoose";
import { Schema } from "mongoose";

const linkSchema = new Schema(
  {
    username: String,
    message: String,
    channel: String,
  },
  { timestamps: true }
);

const Link = mongoose.model("Links", linkSchema);

export default Link;
