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
router.post("/adminlogin", adminController.adminlogin)
router.post("/addCategory", adminController.addcategory)
router.post("/addsub_category", upload.single("image"), adminController.addsub_category);
router.post("/addbrands", upload.single("image"), adminController.addbrands)
router.post("/addproduct", upload.single("image"), adminController.addproduct);

//--------------GET---------------------------------------------------
router.get("/home", adminController.home)
router.get("/getbrands", adminController.getbrands)
router.get("/getCategories", adminController.getCategories);
router.get("/getbyidbrands/:id", adminController.getbyidbrands)

//--------------------PUT------------------------------
router.put("/update/:categoryId", adminController.updateCategory);
router.put("/updateproducts/:id", upload.single("image"), adminController.updateproducts)
router.put("/updateproductsthumnail/:id", upload.array("thumnail", 8), adminController.updateproductsthumnail)
router.put("/updatebrands/:id", upload.single("image"), adminController.updatebrands)
//--------------------------------DELETE--------------------------------------------
router.delete("/delete/:categoryId", adminController.deleteCategory);
router.delete("/deleteproducts/:id", adminController.deleteproducts);
router.delete("/deletebrand/:id", adminController.deletebrand);
router.delete("/deletesub_category/:id", adminController.deletesub_category)

module.exports = router;