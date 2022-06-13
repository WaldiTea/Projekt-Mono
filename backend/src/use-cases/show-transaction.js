const { TransactionsDAO } = require("../db-access");

async function showTransaction({ transactionId }) {
    const foundTransaction = await TransactionsDAO.findTransactionById(transactionId)
    
    if (!foundTransaction) {
        throw new Error("Transaction with provided id not found...")
    }
    return {
        foundTransaction
    }
}
module.exports = { showTransaction }