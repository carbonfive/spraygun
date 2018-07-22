const chalk = require("chalk");
const { aliases } = require("./template-resolver/alias");

const logo = chalk.redBright(`
    ██████  ██▓███   ██▀███   ▄▄▄     ▓██   ██▓  ▄████  █    ██  ███▄    █
  ▒██    ▒ ▓██░  ██▒▓██ ▒ ██▒▒████▄    ▒██  ██▒ ██▒ ▀█▒ ██  ▓██▒ ██ ▀█   █
  ░ ▓██▄   ▓██░ ██▓▒▓██ ░▄█ ▒▒██  ▀█▄   ▒██ ██░▒██░▄▄▄░▓██  ▒██░▓██  ▀█ ██▒
    ▒   ██▒▒██▄█▓▒ ▒▒██▀▀█▄  ░██▄▄▄▄██  ░ ▐██▓░░▓█  ██▓▓▓█  ░██░▓██▒  ▐▌██▒
  ▒██████▒▒▒██▒ ░  ░░██▓ ▒██▒ ▓█   ▓██▒ ░ ██▒▓░░▒▓███▀▒▒▒█████▓ ▒██░   ▓██░
  ▒ ▒▓▒ ▒ ░▒▓▒░ ░  ░░ ▒▓ ░▒▓░ ▒▒   ▓▒█░  ██▒▒▒  ░▒   ▒ ░▒▓▒ ▒ ▒ ░ ▒░   ▒ ▒
  ░ ░▒  ░ ░░▒ ░       ░▒ ░ ▒░  ▒   ▒▒ ░▓██ ░▒░   ░   ░ ░░▒░ ░ ░ ░ ░░   ░ ▒░
  ░  ░  ░  ░░         ░░   ░   ░   ▒   ▒ ▒ ░░  ░ ░   ░  ░░░ ░ ░    ░   ░ ░
        ░              ░           ░  ░░ ░           ░    ░              ░
                                       ░ ░
`);

const aliasBullets = aliases
  .map(alias => chalk`    - {yellow ${alias}}`)
  .join("\n");

const usage = chalk`${logo}
  Usage: spraygun {green <project-directory>} {yellow <template>}

  Generate a project in the specified directory, based on a template.

  {yellow <template>} can be any of the following:
    - An official spraygun template name (see examples below)
    - A path to a local template directory
    - A git repository URL

  Official templates:
${aliasBullets}

  Visit {cyan https://spraygun.io/} to learn more.
`;

function run(args) {
  checkArgs(args);

  try {
    const generate = require("./generator");
    generate(args[0], args[1]);
  } catch (error) {
    console.log(chalk.red(error.message));
  }
}

function checkArgs(args) {
  if (args.includes("-h") || args.includes("--help")) {
    console.log(usage);
    process.exit(0);
  } else if (args.length != 2) {
    console.log(usage);
    process.exit(1);
  }
}

module.exports = run;
