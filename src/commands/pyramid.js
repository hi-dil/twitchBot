import ReadFile from "../utils/ReadFile.js";
import SetCooldown from "../utils/setCooldown.js";

const pyramid = async (client, channel, message, cooldownDuration) => {
  const messageLimit = 500;
  const fileLocation = 'src/models/cooldown.json'
  let cooldown = await ReadFile(fileLocation);

  if (!cooldown?.[channel]?.['pyramid']) {
    if (message.length === 2) {
      const limit = 3;
      const args = message[1].concat(" ")

      if (args.length * limit <= messageLimit) {
        for (let i = 1; i <= limit; i++) client.say(channel, args.repeat(i))
        for (let i = (limit - 1); i > 0; i--) client.say(channel, args.repeat(i))

        let cooldownValue = true
        let afterCdValue = false

        SetCooldown(cooldown, cooldownDuration, fileLocation, cooldownValue, afterCdValue, channel, 'pyramid');
      } else {
        client.say(channel, 'Sadeg exceed emote limit');
      }
    } else {
      const size = message[2];
      const args = message[1].concat(" ")

      if (args.length * size <= messageLimit) {
        for (let i = 1; i <= size; i++) client.say(channel, args.repeat(i))
        for (let i = (size - 1); i > 0; i--) client.say(channel, args.repeat(i))
        SetCooldown(cooldown, cooldownDuration, fileLocation);

      } else {
        client.say(channel, `Sadeg exceed emote limit ${args.length * size}/${messageLimit}`)
      }
    }

  } else {
    client.say(channel, 'The command is under cooldown')
  }
}


export default pyramid;