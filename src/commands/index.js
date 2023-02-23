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
import tuck from "./tuck.js";
import fill from "./fill.js";

const commands = async (channel, tags, message, client, liveList) => {
  const command = message[0].toLowerCase()

  const isLive = []
  liveList.forEach(ch => {
    isLive.push(ch.user_login)
  })

  if (!isLive.includes(channel.replace('#', ''))) {
    if (command === 'pyramid' || command === 'p') pyramid(client, channel, message, 30000)
  } else {
    if (command === 'pyramid') {
      client.say(channel, `@${tags.username} no ${command} in online chat`)
    }
  }

  if (command === 'ping') ping(client, channel)
  if (command === 'hmm') urban(client, channel, message)
  if (command === 'afk' || command === 'gn') setAfk(client, channel, message, tags);
  if (command === 'commands') CommandList(client, channel)
  if (command === 'help') Help(client, channel, message)
  // if (command === 'time') Time(client, channel, message)
  if (command === 'chatting') openai(client, channel, message, tags, 60000)
  if (command === 'hol' || command === 'higherorlower') hol(client, channel, message, tags)
  if (command === 'top') leaderboard(client, channel, message)
  if (command === 'tuck') tuck(client, channel, message)
  if (command === 'fill') fill(client, channel, message)
};

export default commands;