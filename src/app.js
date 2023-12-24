import tmi from "tmi.js";
import options from "./setting/options.js";
import commands from "./commands/index.js";
import ReadRedis from "./utils/redis/ReadRedis.js";
import FindAfk from "./commands/afk/findAfk.js";
import setHol from "./commands/higherorlower/sethol.js";
import twitch from "./twitch_api.js";
import ReadFile from "./utils/ReadFile.js";
import FindReminder from "./commands/reminder/findReminder.js";
import IsValidUrl from "./utils/utils.js";
import SaveLink from "./commands/link/saveLink.js";
import ScrambleAnimeAnswer from "./commands/scramble-anime/scrambleAnimeAnswer.js";
import logger from "./utils/logger.js";
import { redisinit } from "./utils/redisinit.js";

setHol();
redisinit();

// twitch();

const client = new tmi.Client(options);
client.connect();

client.on("message", async (channel, tags, message, self) => {
  if (self) return;
  logger.info(`[${channel}] <${tags.username}>: ${message}`);

  // find afk
  const afkrediskey = "afk";
  const afkList = await ReadRedis(afkrediskey);
  const findUser = afkList.activeAfk.find((user) => user === tags.username);

  if (findUser) FindAfk(client, channel, tags);

  //find reminder
  const reminderRedisKey = "activeReminder";
  const activeReminder = await ReadRedis(reminderRedisKey);
  const findActiveReminder = activeReminder.find(
    (user) => user === tags.username.toLowerCase(),
  );

  //check for scramble anime session
  const cooldownRedisKey = "cooldown";
  const cooldownData = await ReadRedis(cooldownRedisKey);

  if (cooldownData?.[channel]?.["scrambleanime"]?.["start"]) {
    ScrambleAnimeAnswer(client, channel, message, tags);
  }

  //check if the message contains link
  if (IsValidUrl(message)) {
    SaveLink(client, channel, message, tags);
  }

  if (findActiveReminder) FindReminder(client, channel, tags);

  // const fileLocation = "src/models/live.json";
  // const liveList = await ReadFile(fileLocation);

  if (message[0] !== "!") return;
  const cmdSign = "!";
  let cmd = message.split(" ");

  if (cmd[0][0] === cmdSign) {
    if (cmd[0].length === 1) cmd = cmd.filter((command) => command !== cmd[0]);
    else cmd[0] = cmd[0].replace("!", "");
  }

  cmd = cmd.filter((text) => text !== "");

  commands(channel, tags, cmd, client);
});
