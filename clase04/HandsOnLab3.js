//Manager de Usuarios Clase 04
// metodo Crear usuario
// metodo Consultar usuario
const fs = require("fs");
class UserManager {
  constructor(path) {
    this.path = path;
  }
  create() {}
  getManager() {}
}

(async function (run) {
  if (!run) return;
  const userManager = new UserManager("./users.json");
  await userManager.create({
    firstName: "John",
    lastName: "Doe",
    age: 20,
    cours: ["Node.js", "JavaScript", "HTML", "CSS"],
  });
  const users = await userManager.getManager();
  console.log("Acá van los usuarios", users);
});
