import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaderboardSchema = new Schema({
  channel: String,
  leaderboard: Array
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)

export default Leaderboard;