const { dateToday } = require("./dateToday")
const { getDay } = require("./getDay")
const { getWeekStartAndEndTime } = require("./getWeekStartAndEndTime")
const { getMonthStartAndEndTime } = require("./getMonthStartAndEndTime")
const { getYearStartAndEndTime } = require("./getYearStartAndEndTime")

const TimePeriodService = {
    dateToday,
    getDay,
    getWeekStartAndEndTime,
    getMonthStartAndEndTime,
    getYearStartAndEndTime
}

module.exports = {TimePeriodService}