import set from 'lodash.set';
import WriteFile from "./WriteFile.js"

const SetCooldown = (cooldown, cooldownDuration, fileLocation, initialValue, afterCdValue, path, username = "") => {
  let pyramid = true
  if (username !== "") {
    // const path = `${channel}.${commands}.${username}`
    const update = set(cooldown, path, initialValue)

    WriteFile(update, fileLocation)

    setTimeout(() => {

      const updateCD = set(cooldown, path, afterCdValue)
      WriteFile(updateCD, fileLocation)
    }, cooldownDuration);
  }
  else {
    // const path = `${channel}.${commands}`
    const update = set(cooldown, path, initialValue)
    WriteFile(update, fileLocation)

    setTimeout(() => {
      const updateCD = set(cooldown, path, afterCdValue)
      WriteFile(updateCD, fileLocation)
    }, cooldownDuration);
  }
}
export default SetCooldown;