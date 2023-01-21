import ReadFile from "./ReadFile.js";
import WriteFile from "./WriteFile.js";
import set from "lodash.set";

let timeout

const setHolTimeout = async (status, user, client, channel) => {
  if (status === "start") {
    timeout = setTimeout(async () => {
      const fileLocation = 'src/models/cooldown.json'
      const data = await ReadFile(fileLocation)
      client.say(channel, `${user} did not reply in 30 secs. Closing the session.`)
      const path = `${channel}.hol.start`
      const updateSession = set(data, path, false)
      WriteFile(updateSession, fileLocation)
    }, 30000);
  } else if (status === "refresh") {
    timeout.refresh()
  } else {
    clearTimeout(timeout)
  }

}

export default setHolTimeout