const { DateTime } = require("luxon");
function userResponse(user) {
    const {id, username, email, role, token} = user
    return {id, username, email, role, token}
}

function parseLimit(limit) {
    return parseInt(limit) || 5
}

function parsePage(page) {
    return parseInt(page) || 1
}


function parseDate(date) {
    const parsedDate = DateTime.fromFormat(date, 'MM-dd-yyyy');
    return parsedDate.toFormat('yyyy-MM-dd');
}

function sumTime(time,min){
    const [hours, minutes, seconds] = time.toString().split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    date.setMinutes(date.getMinutes() + min);

    const updatedHours = date.getHours();
    const updatedMinutes = date.getMinutes();
    const updatedSeconds = date.getSeconds();
    return `${updatedHours.toString().padStart(2, "0")}:${updatedMinutes.toString().padStart(2, "0")}:${updatedSeconds.toString().padStart(2, "0")}`;
}

module.exports = {
    userResponse,
    parseLimit,
    parsePage,
    parseDate,
    sumTime
}