const {dateToday} = require("./dateToday")

function beginningOfMonth(d) {
    const now = new Date(d)
    now.setDate(1) 
    return now
}

function endOfMonth (d) {
    const now = new Date(d)

    const month = now.getMonth() // 0 - 11
    if(month === 11) {
        const nextYear = now.getFullYear() + 1
        return new Date(nextYear + "-01-01")
    }

    now.setMonth(month + 1) // nächsten monat
    now.setDate(1) // der 1ste vom nächsten monat

    return now
}

//thunk
const getMonthStartAndEndTime = () => {
    const startAndEndOfMonth = {
        "start" : beginningOfMonth(dateToday()).getTime(),
        "end" : endOfMonth(dateToday()).getTime()
    }
    return startAndEndOfMonth
}
module.exports = {getMonthStartAndEndTime}