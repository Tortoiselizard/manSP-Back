require("dotenv").config()
const { Sequelize, DataTypes } = require("sequelize")
const { USER_DB, PASSWORD_DB, PORT_DB, NAME_DB, URL_DB } = process.env
const Command = require("./models/Command")
const Manual = require("./models/Manual")

const database = new Sequelize(`postgres://${USER_DB}:${PASSWORD_DB}@${URL_DB}:${PORT_DB}/${NAME_DB}`,
{logging: false})

Command(database)
Manual(database)

module.exports = {database, ...database.models}