class ProductManager {
  constructor() {
    this.products = [];
  }
  getProduct() {
    return this.products;
  }
  addProduct({ title, description, price, thumbanail, code, stock }) {
    if (!(title && description && price && thumbanail && code && stock)) {
      console.log("Missing data");
      return;
    }
    let itemCode = this.products.find((product) => product.code === code);
    if (itemCode) {
      console.log(`This product with code:'${code}' already exist`);
      return;
    } else {
      this.products.push({
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbanail,
        code,
        stock,
      });
      console.log("Product added");
      return itemCode;
    }
  }
  getProductById(id) {
    let itemId = this.products.find((product) => product.id === id);
    if (!itemId) {
      const notExist = `The product with id: '${id}' does't exist`;
      return notExist;
    }
    return itemId;
  }
}

let productManager = new ProductManager();
console.log("Yours products are:", productManager.getProduct());
productManager.addProduct({
  title: "Producto prueba",
  description: "Este es un producto prueba",
  price: "200",
  thumbanail: "sin imagen",
  code: "abc123",
  stock: "25",
});
console.log("Yours products are now:", productManager.getProduct());
//For return error => this product with code:'${code}' already exist
productManager.addProduct({
  title: "Producto prueba A",
  description: "Este es un producto prueba",
  price: "200",
  thumbanail: "sin imagen",
  code: "abc123",
  stock: "25",
});
productManager.addProduct({
  title: "Producto prueba B",
  description: "Este es un producto prueba",
  price: "300",
  thumbanail: "sin imagen",
  code: "abc1234",
  stock: "10",
});
console.log("Yours products are now:", productManager.getProductById(1));
console.log(productManager.getProductById(2));
