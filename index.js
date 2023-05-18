const server = require("./src/app")
const {database} = require("./src/db")
const port = 3001

server.listen(port, async () => {
    await database.sync({alter:true})
    console.log(`Listening on port ${port}`)
})