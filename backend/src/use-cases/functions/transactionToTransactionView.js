function transactionToTransactionView(transaction) {
    return {
        _id: transaction.id,
        name: transaction.name,
        income: transaction.income,
        amount: transaction.amoun,
        date: transaction.date,
        time: transaction.time
        // picture: transaction.picture,
    }
}