import ping from "./ping.js";
import pyramid from "./pyramid.js";
import urban from "./urban.js";
import setAfk from "./afk/setAfk.js";
import CommandList from "./commandList.js";
import Help from "./help.js";
import Time from "./time.js";

const commands = (channel, tags, message, client) => {
  const command = message[0].toLowerCase()
  if (command === 'ping') ping(client, channel)
  if (command === 'pyramid') pyramid(client, channel, message)
  if (command === 'Hmm') urban(client, channel, message)
  if (command === 'afk') setAfk(client, channel, message, tags);
  if (command === 'commands') CommandList(client, channel)
  if (command === 'help') Help(client, channel, message)
  if (command === 'time') Time(client, channel, message)
};

export default commands;