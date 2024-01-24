const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const AdminAuth = sequelize.define('adminauth', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
});

module.exports = AdminAuth;