const { UserDAO, TransactionsDAO } = require("../db-access")
const { makeUser } = require("../domain/User")
const { userToUserView } = require("./functions/userToUserView")

async function ShowTransactionsInPeriod({userId, startEndTimeStamps}){
    const foundUser = await UserDAO.findUserById(userId)
    if(!foundUser){
        throw new Error("User doesn't exist...")
    }

    const user = makeUser(foundUser)
    const userView = userToUserView(user)

    const transactions = await TransactionsDAO.findAllTransactionsOfUserWithTimePeriod(user._id.toString(), startEndTimeStamps)

    return { ...userView, transactions}
}

module.exports = { ShowTransactionsInPeriod }