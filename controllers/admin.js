const AdminAuth = require("../models/adminauth")
const Category = require("../models/category")
const brands = require("../models/brands")
const product = require("../models/productt")
const slugify = require('slugify');
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
            return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
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
    async addbrands(req, res, next)
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
            const setslug = req.body.slug
            const slug = slugify(setslug, { lower: true });
            const addCategory = await brands.create({ name: name, slug: slug, image: ManuImage })


            return res.status(200).send({ status: 200, message: "brands has been added", data: addCategory });
        } catch (e) {
            console.error("Error in admin login:", e);
            return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
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
            return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
        }
    },
    async addproduct(req, res, next)
    {
        try {

            const name = req.body.name;
            const setslug = req.body.slug
            const slug = slugify(setslug, { lower: true });

            const file = req.file;
            let ManuImage = null;

            if (file) {
                ManuImage = `data:image/png;base64,${file.buffer.toString("base64")}`;

                const result = await cloudinary.uploader.upload(ManuImage);
                ManuImage = result.url;
            }


            const addCategory = await product.create({ name: name, slug: slug, image: ManuImage })


            return res.status(200).json({ status: 200, message: "product has been added", data: addCategory });
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

    //--------------------------GET--------------------------------------
    async home(req, res, next)
    {
        try {
            return res.status(200).send({ status: 200, data: "THIS IS saif project HOME PAGE" });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
        }
    },
    async getbrands(req, res, next)
    {
        try {
            const categories = await brands.findAll();

            return res.status(200).json({
                status: 200,
                message: "brands retrieved successfully",
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
    async getbyidbrands(req, res, next)
    {

        try {
            const brandId = req.params.id;

            // Find the brand by ID
            const brand = await brands.findByPk(brandId);

            if (!brand) {
                return res.status(404).json({ status: 404, message: 'Brand not found', data: null });
            }

            return res.status(200).json({ status: 200, message: 'Brand retrieved successfully', data: brand });
        } catch (error) {
            console.error('Error in getbyid:', error);
            return res.status(500).json({ status: 500, message: 'Internal Server Error', data: null });
        }
    },

    //--------------------PUT----------------------------
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
    async updatebrands(req, res, next)
    {

        try {
            const brandId = req.params.id; // Assuming you have the brand ID in the request parameters
            const file = req.file;
            let brandImage = null;

            if (file) {
                brandImage = `data:image/png;base64,${file.buffer.toString("base64")}`;

                const result = await cloudinary.uploader.upload(brandImage);
                brandImage = result.url;
            }

            const name = req.body.name;
            const setSlug = req.body.slug;
            const slug = slugify(setSlug, { lower: true });

            // Find the brand by ID
            const existingBrand = await brands.findByPk(brandId);

            if (!existingBrand) {
                return res.status(404).json({ status: 404, message: "Brand not found", data: null });
            }

            // Update brand information
            existingBrand.name = name;
            existingBrand.slug = slug;

            // Update image only if it's provided
            if (brandImage) {
                existingBrand.image = brandImage;
            }

            // Save the updated brand
            await existingBrand.save();

            return res.status(200).json({ status: 200, message: "Brand has been updated", data: existingBrand });
        } catch (error) {
            console.error("Error in updateBrands:", error);
            return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
        }
    },
    async updateproducts(req, res, next)
    {

        try {
            const productId = req.params.id; // Assuming you have the brand ID in the request parameters
            const file = req.file;
            let productImg = null;

            if (file) {
                productImg = `data:image/png;base64,${file.buffer.toString("base64")}`;

                const result = await cloudinary.uploader.upload(productImg);
                productImg = result.url;
            }

            const name = req.body.name;
            const setSlug = req.body.slug;
            const slug = slugify(setSlug, { lower: true });

            // Find the brand by ID
            const existingBrand = await product.findByPk(productId);

            if (!existingBrand) {
                return res.status(404).json({ status: 404, message: "product not found", data: null });
            }

            // Update brand information
            existingBrand.name = name;
            existingBrand.slug = slug;

            // Update image only if it's provided
            if (productImg) {
                existingBrand.image = productImg;
            }

            // Save the updated brand
            await existingBrand.save();

            return res.status(200).json({ status: 200, message: "product has been updated", data: existingBrand });
        } catch (error) {
            console.error("Error in updateBrands:", error);
            return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
        }
    },
    async updateproductsthumnail(req, res, next)
    {

        try {
            const productId = req.params.id;
            const files = req.files; // Use req.files for multiple files
            let thumbnails = [];



            if (files && Array.isArray(files)) { // Check if files is an array
                for (const file of files) {
                    if (!file.mimetype.startsWith('image')) {
                        return res.status(400).json({ status: 400, message: "Invalid file type. Please upload images.", data: null });
                    }

                    const thumbnailData = `data:image/png;base64,${file.buffer.toString("base64")}`;
                    const result = await cloudinary.uploader.upload(thumbnailData);
                    thumbnails.push(result.url);
                }
            }

            const existingProduct = await product.findByPk(productId);

            if (!existingProduct) {
                return res.status(404).json({ status: 404, message: "Product not found", data: null });
            }

            // Update thumbnails only if provided
            if (thumbnails.length > 0) {
                existingProduct.thumnail = thumbnails;
            }

            await existingProduct.save();

            return res.status(200).json({ status: 200, message: "Thumbnails have been updated", data: existingProduct });
        } catch (error) {
            console.error("Error in updateproductsthumbnail:", error);
            return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
        }
    },
    //--------------------DELETE------------------------
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
    async deleteproducts(req, res, next)
    {
        try {
            const id = req.params.id;
            const deletedCategory = await product.destroy({
                where: { id: id },
            });

            if (!deletedCategory) {
                return res.status(404).json({
                    status: 404,
                    message: "products not found",
                    data: null,
                });
            }

            return res.status(200).json({
                status: 200,
                message: "products has been deleted",
                data: null,
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                data: null,
            });
        }
    },
};


module.exports = Admin;
