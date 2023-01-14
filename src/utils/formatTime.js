const FormatTime = (uptime, type) => {
  let time = ""
  if (type === 'seconds') {
    var sec_num = parseInt(uptime, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours !== 0) time = time.concat(`${hours} hours `)
    if (minutes !== 0) time = time.concat(`${minutes} minutes `)
    if (seconds !== 0) time = time.concat(`${seconds} seconds`)
  } else {
    var seconds = Math.floor((uptime / 1000) % 60)
    var minutes = Math.floor((uptime / (1000 * 60)) % 60)
    var hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);

    if (hours !== 0) time = time.concat(`${hours} hours `)
    if (minutes !== 0) time = time.concat(`${minutes} minutes `)
    if (seconds !== 0) time = time.concat(`${seconds} seconds`)

  }

  return time;
}

export default FormatTime