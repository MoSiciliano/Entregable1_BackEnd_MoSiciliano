//Desafio entregable 3

const express = require("express");
const app = express();
const ProductManager = require("./ProductManager3");
const port = 8080;
const productManager = new ProductManager("./products.JSON");
app.get("/", (req, res) => {
  const welcome = `<body style="background-color: aqua; display:flex; justify-content: center;align-items: center;">
  <h1 style='color:rgb(155, 85, 185);text-align: center;'>Welcome to my ecommerce</h1>
</body>`;
  res.send(welcome);
});
app.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const getProducts = await productManager.getProducts();
  const productsLimit = getProducts.slice(0, limit);
  limit ? res.send(productsLimit) : res.send(getProducts);
  //   if (!limit) {
  //     res.send(getProducts);
  //   } else {
  //     const productsLimit = getProducts.slice(0, limit);
  //     res.send(productsLimit);
  //   }
});
app.get("/products/:productID", async (req, res) => {
  const { productID } = req.params;
  const getProduct = await productManager.getProductById(parseInt(productID));
  getProduct ? res.send(getProduct) : res.send("You must provide us an ID");
});
app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto: ${port}`);
});
