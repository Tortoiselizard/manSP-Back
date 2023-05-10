const express = require("express")
const morgan = require("morgan")
const router = require("./routes/index")

const server = express()

server.use("/", (req, res, next) => {
    console.log("Estamos pasando por este Middleware")
    next()
})
server.use(morgan("dev"))

server.use("/", router)

module.exports = server