const moment = require("moment");

function FormatDatetime(date) { 
const format1 = "DD-MM-YYYY HH:mm:ss"
const format2 = "DD-MM-YYYY"
// var date1 = new Date("2020-06-24 22:57:36");
// var date2 = new Date();

// dateTime1 = moment(date1).format(format1);
var dateTime = moment(date).format(format1);
    return dateTime
}
export default FormatDatetime;