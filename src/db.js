require("dotenv").config()
const { Sequelize, DataTypes } = require("sequelize")
const { USER_DB, PASSWORD_DB, PORT_DB, NAME_DB, URL_DB, DB_DEPLOY } = process.env
const Command = require("./models/Command")
const Manual = require("./models/Manual")

// const database = new Sequelize(`postgres://${USER_DB}:${PASSWORD_DB}@${URL_DB}:${PORT_DB}/${NAME_DB}`,
// {logging: false})

const database = new Sequelize(`${DB_DEPLOY}`, {
    logging:false,
    // native: false,
    // dialectOptions: {
    //     ssl: {
    //         require: true
    //     }
    // }
})

Command(database)
Manual(database)

module.exports = {database, ...database.models}