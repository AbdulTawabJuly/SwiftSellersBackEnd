const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");

const { createProduct } = require("./controller/Product");
const productsRouters = require("./routes/Products");
const categoriesRouters = require("./routes/Categories");
const brandsRouters = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");

//middleware
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
); // for cross origin problem (aik server se doosre server call ni kar sakte)
server.use(express.json()); //to parse req.body
server.use("/products", productsRouters.router);
server.use("/categories", categoriesRouters.router);
server.use("/brands", brandsRouters.router);
server.use("/users", usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", ordersRouter.router);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/swiftsellers");
  console.log("Databse Connected");
}

server.get("/", (req, res) => {
  // This is  Api Path
  res.json({ status: "Succes" });
});

server.listen(8080, () => {
  console.log("Server is running");
  //This is a call back function to show port kis state mai hai
});
