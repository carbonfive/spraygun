const chalk = require("chalk");
const path = require("path");
const yargs = require("yargs-parser");
const resolvers = require("./resolvers");

const logo = chalk.redBright(`
    ██████  ██▓███   ██▀███   ▄▄▄    ▓██   ██▓  ▄████  █    ██  ███▄    █
  ▒██    ▒ ▓██░  ██▒▓██ ▒ ██▒▒████▄   ▒██  ██▒ ██▒ ▀█▒ ██  ▓██▒ ██ ▀█   █
  ░ ▓██▄   ▓██░ ██▓▒▓██ ░▄█ ▒▒██  ▀█▄  ▒██ ██░▒██░▄▄▄░▓██  ▒██░▓██  ▀█ ██▒
    ▒   ██▒▒██▄█▓▒ ▒▒██▀▀█▄  ░██▄▄▄▄██ ░ ▐██▓░░▓█  ██▓▓▓█  ░██░▓██▒  ▐▌██▒
  ▒██████▒▒▒██▒ ░  ░░██▓ ▒██▒ ▓█   ▓██▒░ ██▒▓░░▒▓███▀▒▒▒█████▓ ▒██░   ▓██░
  ▒ ▒▓▒ ▒ ░▒▓▒░ ░  ░░ ▒▓ ░▒▓░ ▒▒   ▓▒█░ ██▒▒▒  ░▒   ▒ ░▒▓▒ ▒ ▒ ░ ▒░   ▒ ▒
  ░ ░▒  ░ ░░▒ ░       ░▒ ░ ▒░  ▒   ▒▒░▓██ ░▒░   ░   ░ ░░▒░ ░ ░ ░ ░░   ░ ▒░
  ░  ░  ░  ░░         ░░   ░   ░   ▒  ▒ ▒ ░░  ░ ░   ░  ░░░ ░ ░    ░   ░ ░
        ░              ░           ░ ░░ ░           ░    ░              ░
                                      ░ ░
`);

const aliasBullets = resolvers.template.aliases
  .map((alias) => chalk`    {yellow -t ${alias}}`)
  .join("\n");

const usage = chalk`${logo}
  Usage: spraygun {yellow <template>} {green <project-directory>}

  Generate a project in the specified directory, based on a template.

  For example, to generate a React TypeScript app in a directory named blog:
    {gray $} npx spraygun {yellow -t react-ts} {green blog}

  The officially supported spraygun templates are:
${aliasBullets}

  To use a custom template, specify one of the following:
    {yellow -p path}   a local template directory
    {yellow -r URL}    a git repository URL

  Visit {cyan https://github.com/carbonfive/spraygun} to learn more.
`;

function run(args) {
  const { directory, templateName, resolve } = parseOptions(args);

  try {
    const generate = require("./generator");
    const templatePath = resolve(templateName);

    console.log(chalk`


${logo}
  Generating your spraygun project...

  Project   {green ${path.resolve(directory)}}
  Template  {yellow ${templateName}}


    `);

    generate(directory, templateName, templatePath);
  } catch (error) {
    console.log(chalk.red(error.message));
  }
}

function parseOptions(args) {
  const options = yargs(args, {
    alias: { help: ["h"], template: ["t"], path: ["p"], repository: ["r"] },
  });

  let templateName;
  let resolve;

  for (let templateType of Object.keys(resolvers)) {
    if (options[templateType]) {
      templateName = options[templateType];
      resolve = resolvers[templateType];
      break;
    }
  }

  if (options.help) {
    console.log(usage);
    process.exit(0);
  } else if (options._.length != 1 || resolve === undefined) {
    console.log(usage);
    process.exit(1);
  }

  return { directory: options._[0], templateName, resolve };
}

module.exports = run;
