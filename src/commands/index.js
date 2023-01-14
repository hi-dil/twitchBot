import ping from "./ping.js";
import pyramid from "./pyramid.js";
import urban from "./urban.js";
import setAfk from "./afk/setAfk.js";

const commands = (channel, tags, message, client) => {
  if (message[0] === 'ping') ping(client, channel)
  if (message[0] === 'pyramid') pyramid(client, channel, message)
  if (message[0] === 'Hmm') urban(client, channel, message)
  if (message[0] === 'afk') setAfk(client, channel, message, tags);
};

export default commands;