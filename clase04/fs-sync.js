const fs = require("fs");

function writeFile() {
  const path = "./text-input-file.text";
  const content = "Hola mundo✌️";
  fs.writeFileSync(path, content, "utf-8");
}

writeFile();
