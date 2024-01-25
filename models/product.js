const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  info: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  additionalDescription: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
  },
});

module.exports = Product;
