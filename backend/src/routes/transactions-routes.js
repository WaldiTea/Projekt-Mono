const express = require("express")
const multer = require("multer")

const { TransactionService } = require("../use-cases")
const { imageBufferToBase64 } = require("../utils/hash")
const { doAuthMiddleware } = require("../auth/doAuthMiddleware")

const transactionsRouter = express.Router()
const upload = multer()
const pictureUploadMiddleware = upload.single("image")

transactionsRouter.post("/add",
    pictureUploadMiddleware,
    doAuthMiddleware,
    async (req, res) => {
        try {
            const created_atTimeStamp = new Date(req.body.created_at).getTime()
            let image;

            if (req.file === undefined) {
                image = "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
            } else {
                image = imageBufferToBase64(req.file.buffer, req.file.mimetype)
            }
            
            const result = await TransactionService.addTransaction({
                name: req.body.name,
                income: req.body.income === "false" ? false : true,
                amount: Number(req.body.amount),
                created_at: created_atTimeStamp,
                image: image,
                userId: req.userClaims.sub
            })

            res.status(201).json(result)
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: { message: err ? err.message : "Unknown error while adding a new transaction" } })
        }
    }

)

transactionsRouter.get("/:transactionId", doAuthMiddleware, async (req, res) => {
    try {
        const transactionId = req.params.transactionId
        const result = await TransactionService.showTransaction({ transactionId })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: { message: error ? error.message : "Unknown error while loading." } })
    }
})

// edit transaction route 
transactionsRouter.put("/edit/:transactionid", doAuthMiddleware, pictureUploadMiddleware, async (req, res) => {
    try {
        const _id = req.params.transactionid
        const transactioUpdateInfo = {
            _id, 
            "name": req.body.name,
            "amount": Number (req.body.amount),
            "income": req.body.income === "false" ? false : true,
            "created_at": new Date(req.body.created_at).getTime()
        }

        const updatedTransaction = await TransactionService.editTransaction(transactioUpdateInfo)

        res.json(updatedTransaction)
    } catch (error) {
        console.log(error);
        res.status(500).json("Unknown error while editing a Transaction.")
    }
})

//delete Transaction
transactionsRouter.delete("/delete/:transactionId", doAuthMiddleware, async (req, res) => {
    try {
        const transactionId = req.params.transactionId
        console.log(transactionId);
        const result = await TransactionService.deleteTransaction( transactionId )
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: { message: error ? error.message : "Unknown error while delete transaction." } })
    }
})

module.exports = { transactionsRouter }