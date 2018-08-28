const fs = require("fs");

function resolve(name) {
  const exists = fs.existsSync(name);
  if (exists) {
    const stats = fs.statSync(name);
    if (stats.isDirectory()) {
      return name;
    }
  }

  throw new Error(`Not a directory: ${name}`);
}

module.exports = resolve;
