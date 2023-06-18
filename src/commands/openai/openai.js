import { Configuration, OpenAIApi } from "openai";
import SetCooldown from "../../utils/setCooldown.js";
import ReadRedis from "../../utils/redis/ReadRedis.js";
import * as dotenv from "dotenv";

dotenv.config();

const openai = async (client, channel, message, tags, cooldownDuration) => {
  var rediskey = "cooldown";

  const filteredMessage = message.filter((msg) => msg != message[0]);
  const prompt = filteredMessage.join(" ");
  const fileLocation = "src/models/cooldown.json";
  let cooldown = await ReadRedis(rediskey);

  // if (tags.username !== 'bassnix') return
  if (!prompt)
    return client.say(channel, "Madge please do not ask empty question");

  if (
    !cooldown?.[channel]?.["chatting"]?.[tags.username] ||
    tags.username === "bassnix"
  ) {
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_API,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .catch((err) => {
        console.log(err);
        client.say(channel, "kek no bot response");
      });

    const answer = completion?.data?.choices[0]?.text;

    if (answer) {
      client.say(channel, `@${tags.username}, ${answer}`);
      const path = `${channel}.chatting.${tags.username}`;
      SetCooldown(
        cooldown,
        cooldownDuration,
        fileLocation,
        true,
        false,
        path,
        tags.username
      );
    }
  } else {
    client.say(channel, "Please wait for 1 min cd");
  }
};

export default openai;
