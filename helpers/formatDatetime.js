const moment = require("moment");

export function FormatDatetime(date) {
  const format = "DD-MM-YYYY HH:mm:ss";
  var dateTime = moment(date).format(format);
  return dateTime;
}
export function FormatRangePicker(date) {
  const format = "DD-MM-YYYY";
  var dateTime = moment(date).format(format);
  return dateTime;
}

export function FormatToTimestamp(myDate) {
  myDate = myDate.split("-");
  var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
  return newDate.getTime();
}
