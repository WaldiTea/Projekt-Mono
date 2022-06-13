function makeTransaction({
    _id,
    name,
    income,
    amount,
    image,
    created_at,
    userId
}) {
    if (!name) {
        throw new Error("Transaction must include name")
    }
    if (!amount) {
        throw new Error("Transaction must include amount")
    }
    if (!userId) {
        throw new Error("Transaction must include user")
    }

    return {
        _id,
        name,
        income,
        amount,
        image,
        created_at,
        userId
    }
}

module.exports = { makeTransaction }