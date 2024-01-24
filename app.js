const express = require("express");
const adminRoute = require("./routes/admin");
const errorController = require("./controllers/error");
const sequelize = require("./utils/database");
const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const AdminAuth = require("./models/adminauth")

const app = express();
const PORT = 3000;
const HOST = "localhost";

app.use("/admin", adminRoute);
app.use("/shop", (req, res, next) => { });
app.use(errorController);

// before syncing all the models, lets first define their associations.
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync({force: true})
//   .sync()
  .then((result) => {
    app.listen(PORT, HOST, () => {
      console.log(`Listening on ${PORT} and ${HOST}`);
    });
  })
  .catch((err) =>
  {
    console.log(err);
  });
