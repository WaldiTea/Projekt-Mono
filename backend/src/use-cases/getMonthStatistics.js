const { TimePeriodService } = require("../use-cases/functions/periods")
const { TransactionsDAO } = require("../db-access");

async function getMonthStatistics({ userId, showOption } ) {
    console.log("getMonthStatistics");
    const getTimeStamps = await TimePeriodService.getMonthStartAndEndTime()
    
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24 // Month -> one_day, month -> one_day, year -> one_month

    const grundArray = Array.from(Array(31).keys())
            .map(e => ({ label: (e+1).toString(), start: getTimeStamps.start + ONE_DAY_IN_MS * e, end: getTimeStamps.start + ONE_DAY_IN_MS * (e+1) }))
            .filter(dayObj => dayObj.start < getTimeStamps.end)

    const allTransactionsOfMonth = await TransactionsDAO.findAllTransactionsOfUserWithTimePeriod(userId, getTimeStamps)
    const filterAllTransaction = showOption === "income" 
        ? allTransactionsOfMonth.filter(t => t.income === true)
        : allTransactionsOfMonth.filter(t => t.income === false)

    const resultArray = grundArray.map(dayObject => {
        const transactionsOfDay = filterAllTransaction.filter(t => t.created_at >= dayObject.start && t.created_at < dayObject.end)
        
        return {
            label: dayObject.label,
            value: calculateAmount(transactionsOfDay)
        }
    })
    
    return {filterAllTransaction, resultArray} 
}

function calculateAmount(transactions) {
    const amount = transactions.map(t => t.amount)
    .reduce((sum, amount) => sum + amount, 0)

    return amount
}
module.exports = {getMonthStatistics}