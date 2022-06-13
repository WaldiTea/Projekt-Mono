const {dateToday} = require("./dateToday")

function beginnginOfYear(d) {
    const now = new Date(d)
    now.setMonth(0) // 0 - 11
    now.setDate(1) // 1 - 31 
    return now
}


function endOfYear(d) {
    const thisYear = beginnginOfYear(d)
    thisYear.setFullYear(thisYear.getFullYear() + 1)
    return thisYear
}

const getYearStartAndEndTime = () => {
    const startAndEndOfYear = {
        "start" : beginnginOfYear(dateToday()).getTime(),
        "end" : endOfYear(dateToday()).getTime()
    }
    return startAndEndOfYear
}
module.exports = {getYearStartAndEndTime}