const { createRandomSalt, createPasswordHash } = require("../utils/hash")

function makeUser({
    _id,
    name,
    email,
    avatar,
    totalBalance,
    passwordHash,
    passwordSalt

}) {
    if (!name) {
        throw new Error("name must exist.")
    }
    if (!email) {
        throw new Error("E-Mail must exist.")
    }
    if (!passwordHash && !password) {
        throw new Error("User must provide a password or passwordHash")
    }
    const _pwSalt = passwordSalt || createRandomSalt()

    return {
        name,
        email,
        avatar: avatar,
        totalBalance: totalBalance || 0,
        passwordHash: passwordHash || createPasswordHash(password, _pwSalt),
        passwordSalt: _pwSalt,
        _id,
    }
}
module.exports = { makeUser }
//User -> _id, name, email, passwordHash, passwordSalt, avatar, totalBalance: