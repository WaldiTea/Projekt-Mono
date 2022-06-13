const express = require("express")
const multer = require("multer")
const { doAuthMiddleware } = require("../auth/doAuthMiddleware")
const { UserService } = require("../use-cases")
const { imageBufferToBase64 } = require("../utils/hash")


const upload = multer()
const pictureUploadMiddleware = upload.single("avatar")
const userRouter = express.Router()

const { TimePeriodService } = require("../use-cases/functions/periods")


userRouter.get("/allUsers", async (_, res) => {
    try {
        const allUsers = await UserService.listAllUsers()
        res.status(200).json(allUsers)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: { message: error ? error.message : "Unknown error while loading all users." } })
    }
})

userRouter.post("/register", pictureUploadMiddleware, async (req, res) => {
    try {
        const userInfo = req.body
        const avatar = imageBufferToBase64(req.file.buffer, req.file.mimetype)
        const user = await UserService.registerUser({ ...userInfo, avatar })
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Unknown error while registering new user." })
    }
}
)
userRouter.post("/login", async (req, res) => {
    try {
        const result = await UserService.loginUser({
            email: req.body.email,
            password: req.body.password
        })

        if (result.refreshToken) {
            req.session.refreshToken = result.refreshToken
        }
        console.log("result", result);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: { message: error ? error.message : "Unknown error while logging in." } })
    }
})
userRouter.get("/logout", async (req, res) => {
    req.session.refreshToken = null
    res.status(200).json({})
})
userRouter.get("/myProfileInfo", doAuthMiddleware, async (req, res) => {
    try {
        const userId = req.userClaims.sub // an den token wird erkannt, um welchen user es sich handelt...
        const allUsers = await UserService.showProfileInfo({ userId })
        res.status(200).json(allUsers)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: { message: err.message } })
    }
})

userRouter.get("/show-wallet",
    doAuthMiddleware,
    async (req, res) => {
        try {
            const userId = req.userClaims.sub
            const userWallet = await UserService.showWallet({ userId })
            res.status(200).json(userWallet)
        } catch (err) {
            res.status(500).json({ err: { message: err ? err.message : "User not found..." } })
        }
    }
)
userRouter.get("/show-wallet-in-period/:period",
    doAuthMiddleware,
    async (req, res) => {
        try {
            const period = req.params.period
            const userId = req.userClaims.sub
            var startEndTimeStamps = null
            if (period === "month") {
                startEndTimeStamps = TimePeriodService.getMonthStartAndEndTime()
            }
            const userWallet = await UserService.ShowTransactionsInPeriod({ userId, startEndTimeStamps })
            res.status(200).json(userWallet)
        } catch (err) {
            res.status(500).json({ err: { message: err ? err.message : "User not found..." } })
        }
    }
)
userRouter.get("/statistics/:showoption/:timeoption", doAuthMiddleware,
    async (req, res) => {
        try {
            const timeOption = req.params.timeoption
            const showOption = req.params.showoption
            const userId = req.userClaims.sub

            const result = await UserService.getStatistics({ userId, showOption, timeOption })
            res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    }
)
userRouter.post("/refreshtoken", async (req, res) => {
    try {
        const result = await UserService.refreshUserToken({
            refreshToken: req.session.refreshToken || req.body.refreshToken
        })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while refreshing your token." } })
    }
}
)
module.exports = {
    userRouter
}
