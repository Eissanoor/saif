const express = require("express");
const adminRoute = require("./routes/admin");
const errorController = require("./controllers/error");
const sequelize = require("./utils/database");
const app = express();
const PORT = 3000;
const HOST = "localhost";
app.use("/admin", adminRoute);
app.use("/shop", (req, res, next) => { });
app.use(errorController);
sequelize
  // .sync({ force: true })
  .sync()
  .then((result) =>
  {
    app.listen(PORT, HOST, () =>
    {
      console.log(`Listening on ${PORT} and ${HOST}`);
    });
  })
  .catch((err) =>
  {
    console.log(err);
  });
