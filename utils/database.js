const Sequelize = require('sequelize');
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });
let host = process.env.host;
let user = process.env.user;
let password = process.env.password;
let database = process.env.database;
let port = process.env.port;

const sequelize = new Sequelize(database, user, password, {
  dialect: "mysql",
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
  operatorsAliases: false, // Add this line to suppress the deprecation warning
});

module.exports = sequelize;