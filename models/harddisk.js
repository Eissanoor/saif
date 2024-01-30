const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const harddisk = sequelize.define("harddisk", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: Sequelize.STRING,
});

module.exports = harddisk;
