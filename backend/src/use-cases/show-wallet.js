const { UserDAO, TransactionsDAO } = require("../db-access")
const { makeUser } = require("../domain/User")
const { userToUserView } = require("./functions/userToUserView")

async function showWallet({userId}){
    const foundUser = await UserDAO.findUserById(userId)
    if(!foundUser){
        throw new Error("User doesn't exist...")
    }

    const user = makeUser(foundUser)
    const userView = userToUserView(user)

    const transactions = await TransactionsDAO.findAllTransactionsOfUser(user._id.toString())

    return { ...userView, transactions}
}

module.exports = { showWallet }