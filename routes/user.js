const express = require("express")
const {getUser} = require('../controllers/user')
const router = express.Router()

router.get("/:userId", getUser)

module.exports = { userRoute: router };
