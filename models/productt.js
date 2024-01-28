const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    image: Sequelize.STRING,
    thumnail: Sequelize.STRING,
    name: Sequelize.STRING,
    slug: Sequelize.STRING,
});

module.exports = product;
