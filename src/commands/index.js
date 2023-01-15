import ping from "./ping.js";
import pyramid from "./pyramid.js";
import urban from "./urban.js";
import setAfk from "./afk/setAfk.js";

const commands = (channel, tags, message, client) => {
  const test = "sdfa"
  test.toLowerCase()
  if (message[0].toLowerCase() === 'ping') ping(client, channel)
  if (message[0].toLowerCase() === 'pyramid') pyramid(client, channel, message)
  if (message[0].toLowerCase() === 'Hmm') urban(client, channel, message)
  if (message[0].toLowerCase() === 'afk') setAfk(client, channel, message, tags);
};

export default commands;