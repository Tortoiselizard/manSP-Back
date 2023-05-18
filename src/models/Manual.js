const { DataTypes } = require("sequelize")

const Manual = (database) => {
    database.define("Manual", {
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
    })
}

module.exports = Manual