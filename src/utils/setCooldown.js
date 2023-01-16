import WriteFile from "./WriteFile.js"

const SetCooldown = (cooldown, cooldownDuration, fileLocation) => {
  let pyramid = true
  cooldown = { ...cooldown, pyramid }
  WriteFile(cooldown, fileLocation)

  setTimeout(() => {
    pyramid = false
    cooldown = { ...cooldown, pyramid }
    WriteFile(cooldown, fileLocation)
  }, cooldownDuration);
}
export default SetCooldown;