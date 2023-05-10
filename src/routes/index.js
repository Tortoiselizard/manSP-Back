const {Router} = require("express")
const linuxMiddleware = require("./linux")

const router = Router()

router.use("/linux", linuxMiddleware)

module.exports = router