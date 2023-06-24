import db from "../../connection/db.js";
import Leaderboard from "../../models/dbmodels/leaderboard.js";

const setLeaderboard = async (channel, user, score, game) => {
  const dbConn = await db();

  if (!dbConn) return;
  const data = await Leaderboard.findOne({ channel: channel }).catch((err) =>
    console.log(err)
  );

  if (!data) {
    const leaderboard = [
      {
        title: game,
        leaderboard: [{ username: user, score: score }],
      },
    ];

    const setLeaderboard = new Leaderboard({
      channel: channel,
      leaderboard: leaderboard,
    });

    await setLeaderboard.save().catch((error) => console.log(error));
  } else {
    data.leaderboard.map((game) => {
      if (game.title === "hol") {
        const findUser = game.leaderboard.find(
          (userDetail) => userDetail.username === user
        );

        if (findUser) {
          game.leaderboard.map((username) => {
            if (username.username === user) {
              if (score > username.score) {
                username.score = score;
              }
            }
          });
        } else {
          const addUser = { username: user, score: score };
          game.leaderboard = [...game.leaderboard, addUser];
        }
      }
    });

    Leaderboard.findOneAndUpdate({ channel: channel }, data).catch((err) =>
      console.log(err)
    );
  }
};

export default setLeaderboard;
