import mongoose from "mongoose";
import { Schema } from "mongoose";

const reminderSchema = new Schema(
  {
    username: String,
    message: String,
    targetuser: String,
    hassent: Boolean,
  },
  { timestamps: true }
);

const Reminder = mongoose.model("Reminders", reminderSchema);

export default Reminder;
