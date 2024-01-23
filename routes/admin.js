const express = require("express");

const adminController = require("../controllers/admin.js");
const Response = require('../models/response.js');

const router = express.Router();

// router.get("/add-product", adminController.getAddProduct);
router.get('/', (req, res, next) => {
    const response = new Response(200, true, "ok", null);
    res.status(200).json(response.toJson());
});

module.exports = router;