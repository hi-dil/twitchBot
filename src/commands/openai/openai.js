import { Configuration, OpenAIApi } from "openai";
import SetCooldown from "../../utils/setCooldown.js";
import ReadRedis from "../../utils/redis/ReadRedis.js";
import FormatTime from "../../utils/formatTime.js";
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

  if (!cooldown?.[channel]?.["chatting"]?.[tags.username]) {
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_API,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 1.3,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .catch((err) => {
        console.log(err);
        client.say(channel, "kek no bot response");
      });

    const answer = completion?.data?.choices[0]?.message?.content;

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
    client.say(
      channel,
      `Please wait for ${FormatTime(cooldownDuration)} cooldown`
    );
  }
};

export default openai;
