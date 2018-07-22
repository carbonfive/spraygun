const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { green, yellow } = chalk;
const shell = require("shelljs");
const resolveTemplate = require("./template-resolver");

function generate(projectDirectory, template) {
  assertNotExists(projectDirectory);

  console.log(
    `Using ${yellow(template)} to create ${green(
      path.resolve(projectDirectory)
    )}...`
  );

  const templatePath = resolveTemplate(template);
  assertValidTemplate(template, templatePath);

  // Equivalent to bash set -ex
  shell.config.fatal = true;
  shell.config.verbose = true;

  shell.cp("-R", templatePath, projectDirectory);
  const scriptPath = path.resolve(projectDirectory, ".spraygun.js");
  console.log(`Running setup task from ${scriptPath}...`);
  require(scriptPath).setup(projectDirectory, { chalk, shell });
}

function assertNotExists(dir) {
  if (fs.existsSync(dir)) {
    throw new Error(`Oops! ${dir} already exists.`);
  }
}

function assertValidTemplate(name, directory) {
  const script = path.resolve(directory, ".spraygun.js");
  if (!fs.existsSync(script)) {
    throw new Error(
      `${name} is not a spraygun template; it is missing a .spraygun.js file.`
    );
  }
}

module.exports = generate;
