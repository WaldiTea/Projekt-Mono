const { TransactionsDAO, UserDAO } = require("../db-access")
const { makeTransaction } = require("../domain/Transaction")
const { makeUser } = require("../domain/User")

async function addTransaction({ name, income, amount, image, created_at, userId }) {

    const foundUser = await UserDAO.findUserById(userId)
    if (!foundUser) {
        throw new Error("User doesn't exist!")
    }

    const user = makeUser(foundUser)
    const newTransaction = makeTransaction({ name, income, amount, image, created_at, userId })
    const newTotalBalance = newTransaction.income ? user.totalBalance + newTransaction.amount : user.totalBalance - newTransaction.amount

    const [insertResult, updateResult] = await Promise.all([
        TransactionsDAO.insertTransaction(newTransaction),
        UserDAO.updateUsersTotalBalance(user._id, newTotalBalance)
    ])

    const wasSuccess =
        insertResult.acknowledged === true &&
        insertResult.insertedId &&
        updateResult.acknowledged === true &&
        updateResult.modifiedCount === 1 &&
        updateResult.matchedCount === 1

    if (!wasSuccess) {
        throw new Error("Adding a new transaction failed, try again")
    }

    const foundTransaction = TransactionsDAO.findTransactionById(insertResult.insertedId)
    return foundTransaction
}

module.exports = { addTransaction }