const fill = (client, channel, message) => {
  const filteredMessage = message.filter(msg => msg != message[0])
  const prompt = filteredMessage.join(" ");
  let concatWord = '';
  let length = 0;

  const builedString = buildFill(length, concatWord, prompt);

  client.say(channel, builedString);

}

const buildFill = (length, concatWord, prompt) => {
  const temp = concatWord.concat(prompt, " ");
  length = temp.length + 1;
  if (length > 500) {
    return concatWord
  }
  concatWord = temp;
  return buildFill(length, concatWord, prompt);
}

export default fill;