const resolvers = [require("./alias"), require("./git"), require("./path")];

function resolve(name) {
  for (let resolver of resolvers) {
    const directory = resolver(name);
    if (directory) {
      return directory;
    }
  }
  throw new Error(`A template named "${name}" could not be found.`);
}

module.exports = resolve;
