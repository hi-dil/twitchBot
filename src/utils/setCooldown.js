import set from "lodash.set";
import WriteFile from "./WriteFile.js";
import WriteRedis from "./redis/WriteRedis.js";
import schedule from "node-schedule";

const SetCooldown = (
  cooldown,
  cooldownDuration,
  initialValue,
  afterCdValue,
  path,
  username = ""
) => {
  let pyramid = true;
  const rediskey = "cooldown";

  if (username !== "") {
    const update = set(cooldown, path, initialValue);

    WriteRedis(update, rediskey);

    setTimeout(() => {
      const updateCD = set(cooldown, path, afterCdValue);
      WriteRedis(updateCD, rediskey);
    }, cooldownDuration);
  } else {
    const update = set(cooldown, path, initialValue);
    WriteRedis(update, rediskey);

    setTimeout(() => {
      const updateCD = set(cooldown, path, afterCdValue);
      WriteRedis(updateCD, rediskey);
    }, cooldownDuration);
  }
};
export default SetCooldown;
