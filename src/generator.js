const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const shell = require("shelljs");

function generate(projectDirectory, template, templatePath) {
  assertNotExists(projectDirectory);
  assertValidTemplate(template, templatePath);

  // Equivalent to bash set -x
  shell.config.fatal = true;

  console.log(`Copying files from ${path.resolve(templatePath)}...`);
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
