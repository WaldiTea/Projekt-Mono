const { TimePeriodService } = require("../use-cases/functions/periods")
const { TransactionsDAO } = require("../db-access");

async function getYearStatistics({ userId, showOption } ) {
    console.log("getYearStatistics");

    const getCurrentYear = () => new Date().getFullYear()
    const monthPeriod = (year, month) => ({
        start: new Date(year + "-01-01").setMonth(month),
        end: new Date(year + "-01-01").setMonth(month + 1)
    })

    const year = getCurrentYear()

    const grundArray = [
        "Jan.", 
        "Feb.", 
        "Mär.", 
        "Apr.", 
        "Mai.", 
        "Jun.", 
        "Jul.", 
        "Aug.", 
        "Sep.", 
        "Okt.", 
        "Nov.", 
        "Dez.", 
    ].map((label, monthIndex) => ({ label, ...monthPeriod(year, monthIndex)}))

    const allTransactionsOfYear = await TransactionsDAO.findAllTransactionsOfUserWithTimePeriod(userId, {start: grundArray[0].start, end: grundArray[11].end} )
    const filterAllTransaction = showOption === "income" 
        ? allTransactionsOfYear.filter(t => t.income === true)
        : allTransactionsOfYear.filter(t => t.income === false)

    const resultArray = grundArray.map(yearObject => {
        
        const transactionsOfDay = filterAllTransaction.filter(t => t.created_at >= yearObject.start && t.created_at < yearObject.end)
        
        return {
            label: yearObject.label,
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
module.exports = {getYearStatistics}