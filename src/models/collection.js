import mongoose from "mongoose";
import { Schema } from "mongoose";

const collectionschema = new Schema({
  username: String,
  data: Array
}, { timestamps: true });

const Collection = mongoose.model('UserCollection', collectionschema);

export default Collection;