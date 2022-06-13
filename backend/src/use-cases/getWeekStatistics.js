const { TimePeriodService } = require("../use-cases/functions/periods")
const { TransactionsDAO } = require("../db-access");

async function getWeekStatistics({ userId, showOption } ) {
    console.log("getWeekStatistics");
    const getTimeStamps = await TimePeriodService.getWeekStartAndEndTime()
    
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24 // week -> one_day, month -> one_day, year -> one_month

    const grundArray = [
        { label: "Mo", start: getTimeStamps.start, end: getTimeStamps.start + ONE_DAY_IN_MS,  },
        { label: "Di", start: getTimeStamps.start + ONE_DAY_IN_MS, end: getTimeStamps.start + ONE_DAY_IN_MS * 2 },
        { label: "Mi", start: getTimeStamps.start + ONE_DAY_IN_MS * 2, end: getTimeStamps.start + ONE_DAY_IN_MS * 3 },
        { label: "Do", start: getTimeStamps.start + ONE_DAY_IN_MS * 3, end: getTimeStamps.start + ONE_DAY_IN_MS * 4 },
        { label: "Fr", start: getTimeStamps.start + ONE_DAY_IN_MS * 4, end: getTimeStamps.start + ONE_DAY_IN_MS * 5 },
        { label: "Sa", start: getTimeStamps.start + ONE_DAY_IN_MS * 5, end: getTimeStamps.start + ONE_DAY_IN_MS * 6 },
        { label: "So", start: getTimeStamps.start + ONE_DAY_IN_MS * 6, end: getTimeStamps.end } // end ist genau: start + ONE_DAY_IN_MS * 7
    ]

    const allTransactionsOfWeek = await TransactionsDAO.findAllTransactionsOfUserWithTimePeriod(userId, getTimeStamps)
    const filterAllTransaction = showOption === "income" 
        ? allTransactionsOfWeek.filter(t => t.income === true)
        : allTransactionsOfWeek.filter(t => t.income === false)

    // console.log(filterAllTransactionOfWeek);    
    const resultArray = grundArray.map(dayObject => {
        // schritt 1 -> transactionen aus allTransactionsOfWeek für den Tag dayObject (dayObject.start bis dayObject.end) holen
        const transactionsOfDay = filterAllTransaction.filter(t => t.created_at >= dayObject.start && t.created_at < dayObject.end)
        
        // schitt 2 -> value dieser transactionen zusammenrechnen (alle incomes - alle expensen)
        return {
            label: dayObject.label,
            value: calculateAmount(transactionsOfDay)
        }
    })
    
    return {filterAllTransaction, resultArray} // [ { label: "Mo", value: 700 }, { label: "Di", value: 100 }, ...]
}

function calculateAmount(transactions) {
    const amount = transactions.map(t => t.amount)
    .reduce((sum, amount) => sum + amount, 0)

    return amount
}
module.exports = {getWeekStatistics}