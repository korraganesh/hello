const express = require("express")
const { userregister,userlogin } = require("../controllers/auth")
const router = express.Router()

router.post("/", userregister);

router.post("/",userlogin);

module.exports = { authRoute: router };
