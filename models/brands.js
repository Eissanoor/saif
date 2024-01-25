const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const brands = sequelize.define("brands", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    image: Sequelize.STRING,
    slug: Sequelize.STRING,
    name: Sequelize.STRING,
});

module.exports = brands;
