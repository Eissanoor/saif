const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Category = sequelize.define("category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
});

module.exports = Category;
