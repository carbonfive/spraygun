const path = require("path");
const shell = require("shelljs");
const { yellow } = require("chalk");
const cacheLookup = require("./cache");

function resolve(name) {
  if (!name.match(/^https?:|git:|.+@.+:/)) {
    return;
  }

  const cache = cacheLookup(name);

  shell.exec(`git ls-remote '${name}' 2> /dev/null`, { silent: true });
  if (shell.error()) {
    if (cache.isPresent()) {
      console.log(
        `${yellow("Network appears to be offline.")} Using cached template.`
      );
      return cache.location;
    }
    return;
  }

  const tmp = path.resolve(shell.tempdir(), `spraygun-${new Date().getTime()}`);
  shell.config.fatal = true;
  shell.config.verbose = true;
  shell.exec(`git clone '${name}' ${tmp}`);
  shell.config.reset();

  cache.store(tmp);
  return cache.location;
}

module.exports = resolve;
