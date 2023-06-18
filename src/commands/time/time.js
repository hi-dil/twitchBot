import cityTimezones from 'city-timezones';
import moment from 'moment-timezone';

const Time = (client, channel, message) => {
  const filteredMessage = message.filter(msg => msg != message[0])
  const city = filteredMessage.join(" ")

  const cityLookup = cityTimezones.lookupViaCity(city);

  if (!cityLookup.length) {
    client.say(channel, "Please insert city name")
    return
  }

  const timezone = cityLookup[0].timezone;
  const cityTime = moment().tz(timezone).format('HH:mm:ss');
  client.say(channel, cityTime)
}

export default Time;