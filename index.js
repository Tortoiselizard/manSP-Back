const server = require("./src/app")
const port = 3001

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})