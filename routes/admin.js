const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cookieparser = require("cookie-parser");
const adminController = require("../controllers/admin.js");
const Response = require('../models/response.js');
const router = express.Router();
const cors = require("cors");
router.use(cors());
router.use(express.json());
router.use(cookieparser());
router.use(express.urlencoded({ extended: true }));
router.get('/', (req, res, next) =>
{
    const response = new Response(200, true, "ok", null);
    res.status(200).json(response.toJson());
});
router.get("/home", adminController.home)
router.post("/adminlogin", adminController.adminlogin)
router.post("/addCategory", adminController.addcategory)
router.put("/update/:categoryId", adminController.updateCategory);
router.get("/getCategories", adminController.getCategories);
router.delete("/delete/:categoryId", adminController.deleteCategory);
router.post("/addsub_category", upload.single("image"), adminController.addsub_category);
router.post("/addbrands", upload.single("image"), adminController.addbrands)
module.exports = router;