const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");
const productsRouters = require("./routes/Products");
const categoriesRouters = require("./routes/Categories");
const brandsRouters = require("./routes/Brands");

//middleware
server.use(express.json()); //to parse req.body
server.use("/products", productsRouters.router);
server.use("/categories", categoriesRouters.router);
server.use("/brands", brandsRouters.router);
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
