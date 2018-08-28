const resolveRepository = require("./repository");

const aliases = {
  express: "git@github.com:carbonfive/spraygun-express.git",
  react: "git@github.com:carbonfive/spraygun-react.git"
};

function resolve(name) {
  const repo = aliases[name.toLowerCase()];
  if (!repo) {
    throw new Error(
      `Not a recognized template name: "${name}". ` +
        "Please refer to `spraygun --help`"
    );
  }
  return resolveRepository(repo);
}

resolve.aliases = Object.keys(aliases);
module.exports = resolve;
