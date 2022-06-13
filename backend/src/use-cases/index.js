//UserService
const { listAllUsers } = require("./listAllUsers")
const { loginUser } = require("./login-user")
const { refreshUserToken } = require("./refresh-token")
const { registerUser } = require("./register-user")
const { showWallet } = require("./show-wallet")
const { ShowTransactionsInPeriod } = require("./show-transactions-in-period")
const { showProfileInfo } = require("./show-user")
const { getWeekStatistics } = require("./getWeekStatistics")
const { getStatistics } = require("./getStatistics")

//TransactionService
const { addTransaction } = require("./add-transaction")
const { showTransaction } = require("./show-transaction")
const { editTransaction } = require("./edit-transaction")
const { deleteTransaction } = require("./delete-transaction")



const UserService = {
    listAllUsers,
    registerUser,
    loginUser,
    refreshUserToken,
    showWallet,
    ShowTransactionsInPeriod,
    showProfileInfo,
    getWeekStatistics,
    getStatistics
}

const TransactionService = {
    addTransaction,
    showTransaction,
    editTransaction,
    deleteTransaction
}
module.exports = { UserService, TransactionService }