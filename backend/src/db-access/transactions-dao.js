const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")

async function findTransactionById(transactionId) {
    const db = await getDB()
    const foundTransaction = await db.collection("transactions").findOne({ _id: new ObjectId(transactionId) })
    return foundTransaction
}
async function findAllTransactionsOfUser(userId) {
    const db = await getDB()
    const allTransactions = await db.collection("transactions").find({ userId: userId }).sort({ created_at: -1 }).toArray()
    return allTransactions
}
async function findAllTransactionsOfUserWithTimePeriod(userId, getTimeStamps) {
    const db = await getDB()
    const allTransactions = await db.collection("transactions").find({
        $and: [
            { userId: userId },
            {
                created_at: {
                    $gte: getTimeStamps.start,
                    $lt: getTimeStamps.end
                }
            }
        ]
    }).sort({ created_at: -1 }).toArray()
    return allTransactions
}
async function insertTransaction(transaction) {
    const db = await getDB()
    const insertionResult = await db.collection("transactions").insertOne(transaction)
    return insertionResult
}
async function updateTransaction(transactionId, transactionObject) {
    const db = await getDB()
    return db.collection("transactions").updateOne({ _id: new ObjectId(transactionId) }, { $set: transactionObject })
}

async function deleteTransaction(transactionId) {
    const db = await getDB()
    return db.collection("transactions").deleteOne({ _id: new ObjectId(transactionId) })
}

module.exports = {
    insertTransaction,
    findTransactionById,
    findAllTransactionsOfUser,
    updateTransaction,
    findAllTransactionsOfUserWithTimePeriod,
    deleteTransaction
}