const resolveGit = require("./git");

const aliases = {
  express: "git@bitbucket.org:mattbrictson/spraygun-node.git",
  react: "git@bitbucket.org:mattbrictson/react-bem-spike.git"
};

function resolve(name) {
  const repo = aliases[name.toLowerCase()];
  if (!repo) {
    return;
  }
  return resolveGit(repo);
}

resolve.aliases = Object.keys(aliases);
module.exports = resolve;
