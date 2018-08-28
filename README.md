# spraygun

Spraygun is a JavaScript application generator that builds projects with Carbon Five preferences and best practices baked right in. Spend less time configuring and more building cool features.

Two application templates are supported out of the box:

- [spraygun-express](https://github.com/carbonfive/spraygun-express)
- [spraygun-react](https://github.com/carbonfive/spraygun-react)

Refer to the GitHub projects for each of these templates for more information.

## Usage

To get started, make sure you have Node 8.10+ and Yarn installed, then run:

```
$ npx spraygun --help
```

You should see this documentation:

```
Usage: spraygun <template> <project-directory>

Generate a project in the specified directory, based on a template.

For example, to generate a react app in a directory named hello-world:
  $ npx spraygun -t react hello-world

The officially supported spraygun templates are:
  -t express
  -t react

To use a custom template, specify one of the following:
  -p path   a local template directory
  -r URL    a git repository URL
```

## Demo

![demo](./docs/demo.gif)

## How it works

Spraygun fetches its templates from GitHub, makes a local copy in the destination directory you specify, and then executes a handful of setup tasks to get you up and running. This system makes templates very straightforward: each template is itself a fully-functioning app and can be forked, customized, and easily tested.

Each template defines the app-generation process by providing a special `.spraygun.js` file. The typical `.spraygun.js` takes care of these tasks:

- Renaming the app to match your specified project name
- Changing the Node version used by the app to match your local environment
- Initializing a git repo with an initial commit
- Running `yarn install`
- Cleaning up spraygun specific files (e.g. removing `.spraygun.js`)
- Displaying quick-start documentation

Spraygun is heavily inspired by other Carbon Five app generators: [Raygun](https://github.com/carbonfive/raygun) (Rails) and [Razor](https://github.com/carbonfive/razor) (Phoenix).
