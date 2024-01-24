const express = require("express");

const adminController = require("../controllers/admin.js");
const Response = require('../models/response.js');

const router = express.Router();

// Categories
// Route for adding a category
router.post("/add-category", async (req, res) => {
  try {
    // Assuming your request body contains the category name
    const { name } = req.body;
    // Use Sequelize to create a new category
    const newCategory = await Category.create({
      name: name,
    });

    // Send the newly created category as a response
    const response = new Response(201, true, "Category created successfully", { category: newCategory });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/', (req, res, next) => {
    const response = new Response(200, true, "ok", null);
    res.status(200).json(response.toJson());
});
router.get("/home", adminController.home)

module.exports = router;