import set from "lodash.set";
import WriteRedis from "../../utils/redis/WriteRedis.js";
import ReadRedis from "../../utils/redis/ReadRedis.js";
import setGameTimeout from "../../utils/setGameTimeout.js";
import setLeaderboard from "../leaderboard/setLeaderboard.js";
import axios from "axios";

const ScrambleAnime = async (client, channel, message, tags) => {
  const rediskey = "cooldown";
  const animeCountRedisKey = "AnimeCount";

  const data = await ReadRedis(rediskey);
  const animeCountString = await ReadRedis(animeCountRedisKey);
  let animeCount = parseInt(animeCountString);

  if (!data?.[channel]?.["scrambleanime"]?.["start"]) {
    const question = await generateQuestion(
      data,
      animeCount,
      client,
      channel,
      tags
    );

    setGameTimeout(
      "scrambleanime",
      "start",
      tags.username,
      client,
      channel,
      question
    );
  } else {
    if (tags.username === data[channel]["scrambleanime"]["user"]) {
      switch (message[1]) {
        case "refresh":
          const question = await generateQuestion(
            data,
            animeCount,
            client,
            channel,
            tags
          );
          setGameTimeout(
            "scrambleanime",
            "refresh",
            tags.username,
            client,
            channel,
            question
          );
          break;

        case "stop":
          setGameTimeout(
            "scrambleanime",
            "stop",
            tags.username,
            client,
            channel
          );
      }
    }
  }
};

const generateQuestion = async (data, animeCount, client, channel, tags) => {
  const rediskey = "cooldown";
  const animeCountRedisKey = "AnimeCount";

  const getTotalPage = Math.floor(animeCount / 25);
  const getRandomPage = Math.floor(Math.random() * getTotalPage) + 1;
  const getRandomNumber = Math.floor(Math.random() * 25) + 1;

  const url = `https://api.jikan.moe/v4/anime?min_score=8&limit=25&page=${getRandomPage}`;
  console.log(url)
  const questionres = await axios.get(url);

  // get the current anime count and update it
  animeCount = questionres.data.pagination.items.total;
  WriteRedis(animeCount.toString(), animeCountRedisKey);

  // get the question
  var questionobject = questionres.data.data[getRandomNumber];

  // get english title if any
  var question = "";
  if (questionobject.title_english != null) {
    question = questionobject.title_english;
  } else {
    question = questionobject.title;
  }

  // do the scramble
  var questionsb = "";
  var questionDivide = question.split(" ");
  questionDivide.forEach((element) => {
    var scrambledWord = scrambleWord(element);
    questionsb = questionsb.concat(`${scrambledWord} `);
  });

  client.say(channel, questionsb);

  const path = `${channel}.scrambleanime`;

  const updateData = {
    start: true,
    user: tags.username,
    question: questionsb,
    answer: question,
  };

  const updateSession = set(data, path, updateData);
  WriteRedis(updateSession, rediskey);
  return question;
};

function scrambleWord(word) {
  // Convert the word into an array of characters
  const chars = word.split("");

  // Iterate over the array from the last element to the first
  for (let i = chars.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the characters at positions i and j
    const temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
  }

  // Join the characters back into a string
  const scrambledWord = chars.join("");

  return scrambledWord;
}

export default ScrambleAnime;
