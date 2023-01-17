import { Configuration, OpenAIApi } from 'openai';
import SetCooldown from '../utils/setCooldown.js';
import ReadFile from '../utils/ReadFile.js';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = async (client, channel, message, tags, cooldownDuration) => {
  const filteredMessage = message.filter(msg => msg != message[0])
  const prompt = filteredMessage.join(" ");
  const fileLocation = 'src/models/cooldown.json'
  let cooldown = await ReadFile(fileLocation);

  if (tags.username !== 'bassnix') return
  if (!prompt) return client.say(channel, 'Madge please do not ask empty question')
  if (prompt.length > 50) return client.say(channel, 'NepStare Please ask your question in 50 characters or less')

  if (!cooldown?.[channel]?.['chatting']?.[tags.username]) {
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_API,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const answer = completion.data.choices[0].text;

    if (answer) {
      client.say(channel, answer);
      SetCooldown(cooldown, cooldownDuration, fileLocation, true, false, channel, 'chatting', tags.username)
    }

    console.log(completion.data.choices[0].text);
  } else {
    client.say(channel, 'Please wait for 10 min cd')
  }

}

export default openai;