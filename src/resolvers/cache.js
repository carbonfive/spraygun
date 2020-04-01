const fs = require("fs");
const path = require("path");
const { createHash } = require("crypto");
const { homedir } = require("os");
const shell = require("shelljs");

const cacheDir = path.resolve(homedir(), ".cache", "spraygun");
shell.mkdir("-p", cacheDir);

function cache(name) {
  const key = sha(name).substring(0, 12);
  const location = path.resolve(cacheDir, key);

  return {
    location,
    isPresent: () => fs.existsSync(location),
    store: (dir) => {
      shell.rm("-rf", location);
      shell.mv(dir, location);
    },
  };
}

function sha(input) {
  const hash = createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
}

module.exports = cache;
