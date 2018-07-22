const fs = require("fs");

function resolve(name) {
  const exists = fs.existsSync(name);
  if (!exists) {
    return;
  }

  const stats = fs.statSync(name);
  if (!stats.isDirectory()) {
    throw new Error(`Not a directory: ${name}`);
  }

  return name;
}

module.exports = resolve;
