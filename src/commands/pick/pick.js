const pick = async (client, channel, message) => {
  const filteredMessage = message.filter((msg) => msg !== message[0]);
  const messageCount = filteredMessage.length;
  const randompick = Math.floor(Math.random() * messageCount);

  const pick = filteredMessage[randompick];
  client.say(channel, pick);
};

export default pick;
