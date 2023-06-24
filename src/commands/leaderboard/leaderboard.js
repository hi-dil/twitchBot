import db from "../../connection/db.js";
import Leaderboard from "../../models/dbmodels/leaderboard.js";

const leaderboard = async (client, channel, message) => {
  const dbConn = await db();
  const command = message[1].toLowerCase();

  if (!dbConn) return;
  const data = await Leaderboard.findOne({ channel: channel }).catch((err) =>
    console.log(err)
  );

  if (!data) return;

  data.leaderboard.map((game) => {
    if (game.title === command) {
      const sortLeaderboard = game.leaderboard.sort(
        (a, b) => b.score - a.score
      );

      let topLeaderboard = "Top 5 hol: ";
      if (sortLeaderboard) {
        for (let i = 0; i < 5; i++) {
          if (sortLeaderboard[i] !== undefined)
            topLeaderboard =
              topLeaderboard +
              `${i + 1}. ${sortLeaderboard[i]?.username}ㅤ (${
                sortLeaderboard[i]?.score
              }), `;
        }
        client.say(channel, topLeaderboard);
      }
    }
  });
};

export default leaderboard;
