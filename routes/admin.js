const express = require("express");

const adminController = require("../controllers/admin.js");
const Response = require('../models/response.js');

const router = express.Router();
router.use(express.json()); // Add this line to parse JSON bodies
router.use(express.urlencoded({ extended: true }));
// router.get("/add-product", adminController.getAddProduct);
router.get('/', (req, res, next) =>
{
    const response = new Response(200, true, "ok", null);
    res.status(200).json(response.toJson());
});
router.get("/home", adminController.home)
router.post("/adminlogin", adminController.adminlogin)
router.post("/addcategory", adminController.addcategory)
router.post("/addsub_category", adminController.addsub_category)
module.exports = router;