const pyramid = (client, channel, message) => {
  const messageLimit = 500;
  if (message.length === 2) {
    const limit = 5;
    const args = message[1].concat(" ")

    if (args.length * limit <= messageLimit) {
      for (let i = 1; i <= limit; i++) client.say(channel, args.repeat(i))
      for (let i = (limit - 1); i > 0; i--) client.say(channel, args.repeat(i))
    } else {
      client.say(channel, 'Sadeg exceed emote limit');
    }
  } else {
    const size = message[2];
    const args = message[1].concat(" ")

    if (args.length * size <= messageLimit) {
      for (let i = 1; i <= size; i++) client.say(channel, args.repeat(i))
      for (let i = (size - 1); i > 0; i--) client.say(channel, args.repeat(i))
    } else {
      client.say(channel, `Sadeg exceed emote limit ${args.length * size}/${messageLimit}`)
    }
  }
}

export default pyramid;