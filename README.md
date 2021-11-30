# spraygun

[![CircleCI](https://circleci.com/gh/carbonfive/spraygun/tree/main.svg?style=shield)](https://circleci.com/gh/carbonfive/spraygun/tree/main)

Spraygun is a JavaScript application generator that builds projects with Carbon Five preferences and best practices baked right in. Spend less time configuring and more building cool features.

Three application templates are supported out of the box:

- [spraygun-express](https://github.com/carbonfive/spraygun-express)
- [spraygun-react-ts](https://github.com/carbonfive/spraygun-react-ts)

Refer to the GitHub projects for each of these templates for more information.

## Usage

To get started, make sure you have Node 16 and Yarn installed, then run:

```
$ npx spraygun --help
```

You should see this documentation:

```
Usage: spraygun <template> <project-directory>

Generate a project in the specified directory, based on a template.

For example, to generate a React TypeScript app in a directory named blog:
  $ npx spraygun -t react-ts blog

The officially supported spraygun templates are:
  -t express
  -t react-ts

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

## Releasing

When spraygun is installed via npm or yarn, or run via `npx`, it is downloaded from the central npm repository. New versions of spraygun are published to npm so that they are available to users.

Maintainers of spraygun follow these steps to publish a new version:

1. [Create an npm account](https://www.npmjs.com/signup) if you don't have one already.
2. Enable "Authorization and Publishing" 2FA for your npm account.
3. Ask an existing spraygun maintainer to [add your npm account as a maintainer](https://www.npmjs.com/package/spraygun/access) for the spraygun package.
4. Clone this repo and pull the latest `main` branch.
5. Increment the version in `package.json` according to [semver conventions](https://semver.org).
6. Commit the change (e.g. `git commit -m "Releasing v0.4.0"`).
7. Tag the commit using an annotated tag (e.g. `git tag -a v0.4.0 -m v0.4.0`).
8. Push the commit and tag: `git push && git push --tags`.
9. Make sure you are logged into the npm CLI: `npm login`.
10. Publish to npm: `npm publish` (see troubleshooting note below).
11. [Navigate to the tag you just pushed](https://github.com/carbonfive/spraygun/tags) and in the "..." menu, choose "Draft a new release".
12. Name the release the same as the tag without the `v` (e.g. "0.4.0"), add release notes, and publish.

Note: if you get a permissions error during `npm publish`, it might be because you were recently added as a maintainer and that hasn't fully taken effect yet. In that case an existing maintainer needs to perform the publish in order to force npm to update its permissions.
