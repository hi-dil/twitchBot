import tmi from 'tmi.js';
import options from './setting/options.js';
import commands from './commands/index.js'
import CacheStatus from './commands/afk/cacheStatus.js';
import ReadCache from './commands/afk/ReadCache.js';
import FindAfk from './commands/afk/findAfk.js';
import setHol from './commands/sethol.js';

CacheStatus();
setHol();

const client = new tmi.Client(options);
client.connect();

client.on('message', async (channel, tags, message, self) => {
  if (self) return;

  const afkList = await ReadCache();
  const findUser = afkList.activeAfk.find((user) => user === tags.username)

  if (findUser) {
    FindAfk(client, channel, tags);
  }

  if (message[0] !== '!') return
  const cmdSign = "!";
  let cmd = message.split(' ');

  if (cmd[0][0] === cmdSign) {
    if (cmd[0].length === 1) cmd = cmd.filter(command => command !== cmd[0])
    else cmd[0] = cmd[0].replace('!', '');
  }

  cmd = cmd.filter(text => text !== '')

  commands(channel, tags, cmd, client)
})