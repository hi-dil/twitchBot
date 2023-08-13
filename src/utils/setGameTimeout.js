import ReadRedis from "./redis/ReadRedis.js";
import WriteRedis from "./redis/WriteRedis.js";
import set from "lodash.set";
import schedule from "node-schedule";

const gameDuration = 60;
const warningDuration = 10;

// store the game id and its state
const gameJobs = {};
const gameReminderJob = {};

const setGameTimeout = async (game, status, user, client, channel, answer) => {
  const gameID = `${channel}.${game}`;
  switch (status) {
    case "start":
      startTimer(client, channel, answer, gameID, game);
      break;

    case "refresh":
      startTimer(client, channel, answer, gameID, game);
      break;

    case "stop":
      stopTimer(game, gameID);
      break;

    default:
      break;
  }
};

const startTimer = async (client, channel, answer, gameID, game) => {
  const reminderID = `${gameID}.warning`;

  // clear any existing timer for the game
  stopTimer(game, gameID);
  console.log(`New ${game} session start in ${channel}`);

  // get the data from redis
  const rediskey = "cooldown";
  const data = await ReadRedis(rediskey);

  schedule.scheduleJob(
    gameID,
    new Date(Date.now() + gameDuration * 1000),
    async () => {
      switch (game) {
        case "scrambleanime":
          client.say(
            channel,
            `60 seconds have passed. The title of the anime is ${answer}`
          );
          break;

        case "hol":
          client.say(
            channel,
            "No answer received in 60 seconds, closing the session."
          );
          break;

        default:
          break;
      }

      const path = `${channel}.${game}.start`;
      const updateSession = set(data, path, false);
      await WriteRedis(updateSession, rediskey);

      // remove the timer from the object
      schedule.cancelJob(gameID);
      gameJobs[gameID] = undefined;
    }
  );

  gameJobs[gameID] = true;
  const remainingTimer = gameDuration - warningDuration;
  schedule.scheduleJob(
    reminderID,
    new Date(Date.now() + remainingTimer * 1000),
    () => {
      client.say(
        channel,
        `You have 10 seconds left to answer the ${game} game`
      );

      // remove the timer from the object
      schedule.cancelJob(reminderID);
      gameReminderJob[reminderID] = undefined;
    }
  );

  gameReminderJob[reminderID] = true;

  console.log(schedule.scheduledJobs);
};

const stopTimer = (game, gameID) => {
  const reminderID = `${gameID}.warning`;

  if (gameJobs[gameID]) {
    schedule.cancelJob(gameID);
    gameJobs[gameID] = undefined;
  }

  if (gameReminderJob[reminderID]) {
    schedule.cancelJob(reminderID);
    gameReminderJob[reminderID] = undefined;
  }
};

export default setGameTimeout;
