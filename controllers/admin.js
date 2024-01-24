const sequelize = require("../utils/database");
const AdminAuth = require("../models/adminauth")
const Category = require("../models/category")
const dotenv = require("dotenv");
const path = require("path");
const cloudinary = require("cloudinary").v2;
dotenv.config({ path: path.join(__dirname, "..", ".env") });
const C_cloud_name = process.env.C_cloud_name;
const C_api_key = process.env.C_api_key;
const C_api_secret = process.env.C_api_secret;
cloudinary.config({
    cloud_name: C_cloud_name,
    api_key: C_api_key,
    api_secret: C_api_secret,
});
const SubCategory = require("../models/sub_category")
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
            return res.status(200).send({ status: 200, massege: "Admin login successfully:", data: null });
        } catch (e) {
            console.error("Error in admin login:", e);
            return res.status(500).send("Internal Server Error");
        }
    },
    async addcategory(req, res, next)
    {
        try {
            const name = req.body.name;
            const addCategory = await Category.create({ name: name })


            return res.status(200).json({ status: 200, message: "Category has been added", data: addCategory });
        } catch (e) {
            return res
                .status(500)
                .json({
                    status: 500,
                    message: "Internal Server Error",
                    data: null,
                });
        }
    },
    async updateCategory(req, res, next)
    {
        try {
            const categoryId = req.params.categoryId;
            await Category.update(
                { name: req.body.name },
                { where: { id: categoryId } }
            );

            return res.status(200).json({
                status: 200,
                message: "Category has been updated",
                data: null,
            });
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                data: null,
            });
        }
    },
    async deleteCategory(req, res, next)
    {
        try {
            const categoryId = req.params.categoryId;
            const deletedCategory = await Category.destroy({
                where: { id: categoryId },
            });

            if (!deletedCategory) {
                return res.status(404).json({
                    status: 404,
                    message: "Category not found",
                    data: null,
                });
            }

            return res.status(200).json({
                status: 200,
                message: "Category has been deleted",
                data: null,
            });
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                data: null,
            });
        }
    },
    async getCategories(req, res, next)
    {
        try {
            const categories = await Category.findAll();

            return res.status(200).json({
                status: 200,
                message: "Categories retrieved successfully",
                data: categories,
            });
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                data: null,
            });
        }
    },
    async addsub_category(req, res, next)
    {

        try {
            const file = req.file;
            let ManuImage = null;

            if (file) {
                ManuImage = `data:image/png;base64,${file.buffer.toString("base64")}`;

                const result = await cloudinary.uploader.upload(ManuImage);
                ManuImage = result.url;
            }

            const name = req.body.name;
            const category_id = req.body.category_id;
            const addCategory = await SubCategory.create({ name: name, category_id: category_id, image: ManuImage })


            return res.status(200).send({ status: 200, message: "sub_category has been added", data: addCategory });
        } catch (e) {
            console.error("Error in admin login:", e);
            return res.status(500).send("Internal Server Error");
        }
    }


};


module.exports = Admin;
