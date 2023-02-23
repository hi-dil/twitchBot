const tuck = async (client, channel, message) => {
  let filteredMessage = message.filter(msg => msg !== message[0])
  filteredMessage = filteredMessage.filter(msg => msg !== message[1])
  const tuckMessage = filteredMessage.join(" ");

  if (!tuckMessage) client.say(channel, `You tucked ${message[1]} to bed 👉 FumoTuck`);
  else client.say(channel, `You tucked ${message[1]} to bed 👉 ${tuckMessage}`);
}

export default tuck