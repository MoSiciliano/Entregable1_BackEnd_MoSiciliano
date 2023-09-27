const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async getProducts() {
    return getJSONFromFile(this.path);
  }
  async addProduct({ title, description, price, thumbanil, code, stock }) {
    if (!(title && description && price && thumbanil && code && stock)) {
      throw new Error("Data is missing, please check it");
    }
    try {
      const products = await this.getProducts();
      const codeExist = products.find((product) => product.code === code);
      if (!codeExist) {
        let newId = products.length > 0 ? products[products.length - 1].id : 0;
        products.push({
          id: newId + 1,
          title,
          description,
          price,
          thumbanil,
          code,
          stock,
        });
        await saveJSONToFile(this.path, products);
        return products;
      } else {
        throw new Error(`The product with code:${code} already exist.`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async getProductById(id) {
    const products = await getJSONFromFile(this.path);
    const findProduct = products.find((product) => product.id === id);
    return findProduct ? findProduct : `doesn't exist yet.`;
  }
  async updateProduct({
    id,
    title,
    description,
    price,
    thumbanil,
    code,
    stock,
  }) {
    if (!id) {
      throw new Error(`you must provide us with an id⛔`);
    }
    const products = await getJSONFromFile(this.path);
    let findCode = products.find(
      (product) => product.code === code && product.id !== id
    );
    if (findCode) {
      throw new Error(
        `The provided code ${findCode.code} already exist, cant't update`
      );
    }
    let product = await this.getProductById(id);
    if (typeof product !== "string") {
      product.title = title || product.title;
      product.description = description || product.description;
      product.price = price || product.price;
      product.thumbanil = thumbanil || product.thumbanil;
      product.code = code || product.code;
      product.stock = stock || product.stock;

      const data = await getJSONFromFile(this.path);
      const productIndex = data.findIndex((product) => product.id === id);
      data[productIndex] = product;
      await saveJSONToFile(this.path, data);
    } else {
      console.log("No entra");
    }
  }
  async deleteProduct(id) {
    if (!id) {
      throw new Error(`you must provide us with an id⛔`);
    }
    let product = await this.getProductById(id);

    if (typeof product !== "string") {
      let products = await getJSONFromFile(this.path);
      products = products.filter((product) => product.id !== id);
      saveJSONToFile(this.path, products);
      console.log(`Product with id:${id} was deleted`);
      return products;
    } else {
      throw new Error(
        `You can't delet this product with id:${id} beacause doesn't exist yet.`
      );
    }
  }
}
const existFile = async (path) => {
  try {
    await fs.promises.access(path);
    return true;
  } catch (error) {
    return false;
  }
};

const getJSONFromFile = async (path) => {
  if (!(await existFile(path))) {
    return [];
  }
  let content;
  try {
    content = await fs.promises.readFile(path, "utf-8");
  } catch (error) {
    throw new Error(`The file ${path} couldn't be read.`);
  }
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`The file ${path} isn't in valid JSON format.`);
  }
};

const saveJSONToFile = async (path, data) => {
  const content = JSON.stringify(data, null, "\t");
  try {
    await fs.promises.writeFile(path, content, "utf-8");
  } catch (error) {
    throw new Error(`The file ${path} couldn't be written.`);
  }
};
//////////////////////Testing////////////////////////
(async function (run) {
  if (!run) return;

  ///se creara la primera instancia de "ProductManager"
  const productManager = new ProductManager("./products.json");

  ///Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
  console.log(
    "You don't have any products yet 😔",
    await productManager.getProducts()
  );

  setTimeout(async () => {
    // Se llamará al método “addProduct” con los campos:
    // title: “producto prueba”
    // description:”Este es un producto prueba”
    // price:200,
    // thumbnail:”Sin imagen”
    // code:”abc123”,
    // stock:25

    //El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
    await productManager.addProduct({
      title: "Product A",
      description: "Description product A",
      price: 200,
      thumbanil: "without image",
      code: "abc123",
      stock: 5,
    });
    await productManager.addProduct({
      title: "Product B",
      description: "Description product B",
      price: 200,
      thumbanil: "without image",
      code: "abc1234",
      stock: 5,
    });
    await productManager.addProduct({
      title: "Product C",
      description: "Description product C",
      price: 200,
      thumbanil: "without image",
      code: "abc12345",
      stock: 5,
    });
  }, 2500);
  setTimeout(async () => {
    console.log(`In 1 second you could see your products...⏱️`);
    //Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
    const products = await productManager.getProducts();
    console.log("Your Products are now:", products);

    //Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
    console.log(
      `Product with id 0 is:`,
      await productManager.getProductById(0)
    );
    console.log(
      `Product with id 2 is:`,
      await productManager.getProductById(2)
    );
    console.log(
      `Product with id 3 is:`,
      await productManager.getProductById(3)
    );
  }, 5000);
  setTimeout(async () => {
    //Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
    await productManager.updateProduct({
      id: 2,
      title: "Product New",
      description: "Description product D",
      price: 300,
      thumbanil: "without image",
      code: "nuevo code 12",
      stock: 10,
    });

    //Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
    await productManager.deleteProduct(1);
    await productManager.deleteProduct(5);
  }, 5500);
})(true);
