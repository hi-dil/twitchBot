import channels from "./channels.js";
import * as dotenv from 'dotenv';

dotenv.config();

const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: channels
}

export default options;