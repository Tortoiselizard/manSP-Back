const { DataTypes } = require("sequelize")

const Command = (database) => {
    database.define("Command", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        manual: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        webPage: {
            type: DataTypes.STRING
        }
    })
}

module.exports = Command