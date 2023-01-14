import FormatTime from "../utils/formatTime.js";
const ping = (client, channel) => {
  let time = process.uptime().toString();
  let uptime = FormatTime(time, "seconds");
  client.say(channel, `MrDestructoid bot has been running for ${uptime}`)
}


export default ping