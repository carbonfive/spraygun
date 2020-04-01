const resolveRepository = require("./repository");

const aliases = {
  express: "https://github.com/carbonfive/spraygun-express.git",
  react: "https://github.com/carbonfive/spraygun-react.git",
  "react-ts": "https://github.com/carbonfive/spraygun-react-ts.git",
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
