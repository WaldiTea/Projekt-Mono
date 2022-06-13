function userToUserView(user) {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        totalBalance: user.totalBalance
    }
}
module.exports = {
    userToUserView
}