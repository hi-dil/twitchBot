import { map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import * as dotenv from "dotenv";
import axios from "axios";
import channels from "./setting/channels.js";
import WriteFile from "./utils/WriteFile.js";

dotenv.config();

var refreshTime = 0;

const twitch = async () => {
  var token = await getToken();

  setTimeout(async () => {
    token = await getToken();
    refreshTime = token.expires_in;
    // console.log(`refresh time: ${refreshTime}`);
  }, refreshTime);

  let twitchApiUrl = `https://api.twitch.tv/helix/streams?user_login=okcode&user_login=akashott`;
  const headers = {
    "Client-ID": process.env.CLIENT_ID,
    Authorization: `Bearer ${token.access_token}`,
  };

  channels.forEach((channel) => {
    const user = channel.replace("#", "");
    twitchApiUrl = twitchApiUrl.concat(`&user_login=${user}`);
  });

  let isLive = await axios
    .get(twitchApiUrl, { headers: headers })
    .catch((err) => console.log(err));

  if (isLive) {
    let response = isLive.data.data;

    const fileLocation = "src/models/live.json";
    WriteFile(response, fileLocation);

    setInterval(async () => {
      try {
        const getLiveList = await axios.get(twitchApiUrl, { headers: headers });
        const liveRes = getLiveList.data.data;
        WriteFile(liveRes, fileLocation);
      } catch (error) {
        console.log(error);
      }
    }, 180000);
  }
};

const getToken = async () => {
  const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`;
  const response = await axios.post(tokenUrl).catch((err) => console.log(err));
  return response.data;
};

export default twitch;
