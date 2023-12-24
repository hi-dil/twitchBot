import moment from "moment";

const FormatTime = (uptime, type) => {
  console.log(`${uptime} ${type}`);
  let time = "";
  if (type === "seconds") {
    const duration = moment.duration(uptime, 'seconds');

    const components = [];

    if (duration.years() !== 0) components.push(`${duration.years()} years`);
    if (duration.months() !== 0) components.push(`${duration.months()} months`);
    if (duration.days() !== 0) components.push(`${duration.days()} days`);
    if (duration.hours() !== 0) components.push(`${duration.hours()} hours`);
    if (duration.minutes() !== 0) {
      components.push(`${duration.minutes()} minutes`);
    }
    if (duration.seconds() !== 0) {
      components.push(`${duration.seconds()} seconds`);
    }

    time = components.join(" ");
  } else if (type === "millis") {
    const duration = moment.duration(uptime);

    const components = [];

    if (duration.years() !== 0) components.push(`${duration.years()} years`);
    if (duration.months() !== 0) components.push(`${duration.months()} months`);
    if (duration.days() !== 0) components.push(`${duration.days()} days`);
    if (duration.hours() !== 0) components.push(`${duration.hours()} hours`);
    if (duration.minutes() !== 0) {
      components.push(`${duration.minutes()} minutes`);
    }
    if (duration.seconds() !== 0) {
      components.push(`${duration.seconds()} seconds`);
    }

    time =  components.join(" ");
  }

  return time;
};

export default FormatTime;
