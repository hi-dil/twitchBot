import ping from "./ping.js";
import pyramid from "./pyramid.js";
import urban from "./urban.js";
import setAfk from "./afk/setAfk.js";
import CommandList from "./commandList.js";
import Help from "./help.js";
import Time from "./time.js"
import openai from "./openai.js";
import hol from "./higherorlower.js";
import leaderboard from "./leaderboard.js";

const commands = (channel, tags, message, client) => {
  const command = message[0].toLowerCase()
  if (command === 'ping') ping(client, channel)
  if (command === 'pyramid') pyramid(client, channel, message, 30000)
  if (command === 'hmm') urban(client, channel, message)
  if (command === 'afk') setAfk(client, channel, message, tags);
  if (command === 'commands') CommandList(client, channel)
  if (command === 'help') Help(client, channel, message)
  if (command === 'time') Time(client, channel, message)
  if (command === 'chatting') openai(client, channel, message, tags, 600000)
  if (command === 'hol' || command === 'higherorlower') hol(client, channel, message, tags)
  if (command === 'top') leaderboard(client, channel, message)

};

export default commands;