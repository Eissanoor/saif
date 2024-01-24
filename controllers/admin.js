const sequelize = require("../utils/database");
const AdminAuth = require("../models/adminauth")
const express = require('express');
const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());
const Admin = {
    async home(req, res, next)
    {
        try {
            return res.status(200).send({ status: 200, data: "THIS IS saif project HOME PAGE" });
        } catch (e) {
            console.error(e);
            return res.status(500).send("Internal Server Error");
        }
    },
    async adminlogin(req, res, next)
    {
        try {
            const adminEmail = req.body.email;
            const adminPassword = req.body.password;
            const getadmin = await AdminAuth.findOne({
                where: {
                    email: adminEmail,
                    password: adminPassword,
                },
            });
            if (!getadmin) {
                return res.status(404).send({ status: 404, error: "Invalid credentials" });
            }
            return res.status(200).send({ status: 200, data: "Admin login successfully:" });
        } catch (e) {
            console.error("Error in admin login:", e);
            return res.status(500).send("Internal Server Error");
        }
    }


};

module.exports = Admin;
