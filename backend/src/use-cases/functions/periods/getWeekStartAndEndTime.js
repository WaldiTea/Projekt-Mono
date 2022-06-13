const {dateToday} = require("./dateToday")

const getWeekStartAndEndTime = () => {
    const today = dateToday()
    const beginnginOfWeek = getMonday(today)
    const endOfWeek = getEndOfWeek(today)
    
    return {
        start: beginnginOfWeek.getTime(),
        end: endOfWeek.getTime()
    }
}
function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(), // 0-6
        diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

function getEndOfWeek (d) {
    d = new Date(d);
    const diff = d.getDate() + 7
    return getMonday(d.setDate(diff))
}

module.exports = {getWeekStartAndEndTime}