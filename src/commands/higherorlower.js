import ReadFile from '../utils/ReadFile.js';
import set from 'lodash.set';
import WriteFile from '../utils/WriteFile.js';
import setHolTimeout from '../utils/setHolTimeout.js';
import setLeaderboard from './leaderboard/setLeaderboard.js';

const hol = async (client, channel, message, tags) => {

  const fileLocation = 'src/models/cooldown.json'
  const data = await ReadFile(fileLocation)
  const holDataLocation = 'src/models/holList.json'
  const holData = await ReadFile(holDataLocation);

  if (!data?.[channel]?.['hol']?.['start']) {
    const random = Math.floor(Math.random() * holData.length)
    const random2 = Math.floor(Math.random() * holData.length)

    const firstQ = holData[random]
    const secondQ = holData[random2]

    generateQuestion(firstQ, secondQ, data, fileLocation, client, channel, tags, 0);

    setHolTimeout("start", tags.username, client, channel)
  } else {
    const ansData = data?.[channel]?.['hol']
    if (tags.username !== ansData.user) return client.say(channel, `Please wait for ${ansData?.user} to finish the session`)
    if (message[1] === "") return client.say(channel, `TeriHigh Please give your answer ${ansData?.user}`)

    const userAns = message[1]
    const actualAns = ansData?.answer

    if (userAns === actualAns || actualAns === 'both') {

      const score = ansData.score + 1

      const previousSearchVolume = abbreviateNumber(ansData?.question?.searchVolume);
      client.say(channel, `Correct. ${ansData?.question.keyword} have ${previousSearchVolume} searches/month`)
      setHolTimeout('refresh')

      const random = Math.floor(Math.random() * holData.length)
      const firstQ = ansData?.question
      const secondQ = holData[random]

      generateQuestion(firstQ, secondQ, data, fileLocation, client, channel, tags, score)

    } else {
      const searchVolume = abbreviateNumber(ansData?.question.searchVolume)
      client.say(channel, `Wrong. The answer is ${actualAns}. ${ansData?.question?.keyword} has ${searchVolume} searches/month`)
      setHolTimeout('stop', tags.username, client, channel);

      const score = data?.[channel]?.['hol']?.['score']

      client.say(channel, `You got ${score} correct.`)

      const path = `${channel}.hol.start`
      const updateSession = set(data, path, false)
      WriteFile(updateSession, fileLocation)

      setLeaderboard(channel, tags.username, score, 'hol')
    }
  }
}

const higherOrLower = (firstQ, secondQ) => {
  if (firstQ.searchVolume < secondQ.searchVolume) return 'higher'
  if (firstQ.searchVolume === secondQ.searchVolume) return 'both'
  if (firstQ.searchVolume > secondQ.searchVolume) return 'lower'
}

const abbreviateNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "b";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "m";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "k";
  } else {
    return num;
  }
}

const generateQuestion = (firstQ, secondQ, data, fileLocation, client, channel, tags, score) => {

  const searchVolume = abbreviateNumber(firstQ.searchVolume)

  client.say(channel, `${secondQ.keyword} get _____ searches than ${firstQ.keyword} (${searchVolume} searches)`)
  const answer = higherOrLower(firstQ, secondQ);

  const path = `${channel}.hol`

  const updateData = {
    start: true,
    user: tags.username,
    question: secondQ,
    answer: answer,
    score: score
  }

  const updateSession = set(data, path, updateData)

  WriteFile(updateSession, fileLocation)
}


export default hol;