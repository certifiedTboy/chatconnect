const moment = require("moment");

const dateTimeCalculator = (hours, minutes, givenDateTime) => {
  if (hours < 0) {
    console.log("Hours cannot be negative");
    return { error: "Hours cannot be negative" };
  }

  if (minutes < 0) {
    console.log("Minutes cannot be negative");
    return { error: "Minutes cannot be negative" };
  }

  if (givenDateTime.getTime() < Date.now()) {
    console.log("invalid Date");
    return { error: "Invalid Data" };
  }

  const calculatedDate = moment().add(hours, "hours");
  calculatedDate.add(minutes, "minutes");

  return calculatedDate.toDate();
};

module.exports = { dateTimeCalculator };
