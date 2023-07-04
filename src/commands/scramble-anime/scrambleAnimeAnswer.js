import set from "lodash.set";
import WriteRedis from "../../utils/redis/WriteRedis.js";
import ReadRedis from "../../utils/redis/ReadRedis.js";
import setGameTimeout from "../../utils/setGameTimeout.js";
import setLeaderboard from "../leaderboard/setLeaderboard.js";
import axios from "axios";

const ScrambleAnimeAnswer = async (client, channel, message, tags) => {
  let rediskey = "cooldown";

  const data = await ReadRedis(rediskey);
  const answer = data[channel]["scrambleanime"]["answer"];

  const matchPercentage = getSimilarityPercentage(
    message.toLowerCase(),
    answer.toLowerCase()
  );
  console.log(matchPercentage);
  console.log(answer);

  if (matchPercentage > 70) {
    client.say(
      channel,
      `Your answer is correct. The title of the anime is ${answer}`
    );
    setGameTimeout("scrambleanime", "stop", tags.username, client, channel);

    const path = `${channel}.scrambleanime`;
    const updateSession = set(data, path, false);
    WriteRedis(updateSession, rediskey);
  }
};

function getSimilarityPercentage(str1, str2) {
  // Convert the strings to sets of unique characters
  const set1 = new Set(str1);
  const set2 = new Set(str2);

  // Find the intersection of the sets
  const intersection = new Set([...set1].filter((char) => set2.has(char)));

  // Find the union of the sets
  const union = new Set([...set1, ...set2]);

  // Calculate the Jaccard similarity index
  const similarity = intersection.size / union.size;

  // Convert the similarity to a percentage
  const percentage = similarity * 100;

  return percentage;
}

export default ScrambleAnimeAnswer;
