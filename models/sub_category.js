const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const subcategroy = sequelize.define("sub_categroy", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    category_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
});

module.exports = subcategroy;
