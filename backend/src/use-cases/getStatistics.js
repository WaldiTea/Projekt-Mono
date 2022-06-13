const { getWeekStatistics } = require("./getWeekStatistics")
const { getMonthStatistics } = require("./getMonthStatistics")
const { getYearStatistics } = require("./getYearStatistics")

async function getStatistics({ userId, showOption, timeOption }) {
    if (timeOption === "Monatlich") {
        return getMonthStatistics({ userId, showOption })
    } else if (timeOption === "Jaehrlich") {
        return getYearStatistics({ userId, showOption })
    } else {
        return getWeekStatistics({ userId, showOption })
    }
    // const result = await getWeekStatistics({ userId, showOption,})
    // return result
}

module.exports = { getStatistics }


