const { TransactionsDAO } = require("../db-access");

async function deleteTransaction( transactionId ) {
    const delTransaction = await TransactionsDAO.deleteTransaction(transactionId)
    
    return delTransaction
    
}
module.exports = { deleteTransaction }