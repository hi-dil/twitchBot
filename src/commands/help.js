import fs from 'fs';

const Help = async (client, channel, message) => {
  const readData = await fs.promises.readFile('src/models/commandList.json').catch(err => console.log(err))
  const commandList = JSON.parse(readData);

  const command = message[1].toLowerCase()

  if (!command) {
    client.say(channel, 'use !commands to get a list of commands')
    return
  }

  commandList.commands.forEach((cmd) => {
    if (cmd.title === command) {
      client.say(channel, `${command} : ${cmd.description}`)
    }
  })
}

export default Help;