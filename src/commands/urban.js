import axios from 'axios';

const urban = async (client, channel, message) => {
  const filteredMessage = message.filter(msg => msg != message[0])
  const term = filteredMessage.join(" ");

  const url = `https://api.urbandictionary.com/v0/define?term=${term}`

  const res = await axios.get(url);
  const response = res.data.list;
  const sortedResult = response.sort((a, b) => {
    if (a['thumbs_up'] < b['thumbs_up']) return 1
    if (a['thumbs_up'] > b['thumbs_up']) return -1
    return 0
  })

  if (sortedResult.length >= 1) client.say(channel, `${term}: ${sortedResult[0].definition} ${sortedResult[0].permalink}`)
  else client.say(channel, 'Sadeg no definition found')
}

export default urban