import ReadRedis from "../../utils/redis/ReadRedis.js";
import SetCooldown from "../../utils/setCooldown.js";

const pyramid = async (client, channel, message, cooldownDuration) => {
  const rediskey = "cooldown";

  const messageLimit = 500;
  const pyramidLimit = 10;
  const fileLocation = "src/models/cooldown.json";
  let cooldown = await ReadRedis(rediskey);

  if (!cooldown?.[channel]?.["pyramid"]) {
    if (message.length === 2) {
      const limit = 3;
      const args = message[1].concat(" ");

      if (args.length * limit <= messageLimit) {
        for (let i = 1; i <= limit; i++) client.say(channel, args.repeat(i));
        for (let i = limit - 1; i > 0; i--) client.say(channel, args.repeat(i));

        let cooldownValue = true;
        let afterCdValue = false;
        const path = `${channel}.pyramid`;

        SetCooldown(
          cooldown,
          cooldownDuration,
          fileLocation,
          cooldownValue,
          afterCdValue,
          path
        );
      } else {
        client.say(channel, "Sadeg exceed emote limit");
      }
    } else {
      const size = message[2];
      const args = message[1].concat(" ");

      if (size > pyramidLimit) {
        client.say(channel, "NepStare the max limit of pyramid size is 10");
        return;
      }

      let cooldownValue = true;
      let afterCdValue = false;
      const path = `${channel}.pyramid`;

      if (args.length * size <= messageLimit) {
        for (let i = 1; i <= size; i++) client.say(channel, args.repeat(i));
        for (let i = size - 1; i > 0; i--) client.say(channel, args.repeat(i));
        SetCooldown(
          cooldown,
          cooldownDuration,
          fileLocation,
          cooldownValue,
          afterCdValue,
          path
        );
      } else {
        client.say(
          channel,
          `Sadeg exceed emote limit ${args.length * size}/${messageLimit}`
        );
      }
    }
  } else {
    client.say(channel, "The command is under cooldown");
  }
};

export default pyramid;
