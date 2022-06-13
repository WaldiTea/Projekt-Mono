const { TransactionsDAO } = require("../db-access");


async function editTransaction({ _id, ...updateInfo }) {
    const updatedTransaction = await TransactionsDAO.updateTransaction(_id, updateInfo)
    return updatedTransaction

}
module.exports = {
    editTransaction
}