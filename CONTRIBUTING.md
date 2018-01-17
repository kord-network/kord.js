# Contributing

See the [META contributing guide](https://github.com/meta-network/docs/blob/master/CONTRIBUTING.md).

`meta.js` is a [monorepo](https://danluu.com/monorepo/) and its tooling has been
chosen to simplify the process of building and testing packages simultaneously,
whilst remaining light and transparent:

- 🃏 **[Jest](https://facebook.github.io/jest/)** - used to run tests for all
  packages simultaneously.
- 🐉 **[Lerna](https://github.com/lerna/lerna)** - purely included for the
  [`run`](https://github.com/lerna/lerna#run) command, which enables an npm
  script to be executed in each package that contains that script. This repo is
  not classed as a _Lerna repo_.
- 📦 **[NPM Scoped Packages](https://docs.npmjs.com/misc/scope)** - naming
  convention used so packages can be published individually while under the
  scope of the wider library.
- 🗞 **[Rollup](https://github.com/rollup/rollup)** - used to run the build
  process and bundle modules into a distributable library.
- 🐈 **[Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)** - used
  to manage package dependencies and symlinking. All new dependencies should be
  installed with [`yarn add [--dev]`](https://yarnpkg.com/lang/en/docs/cli/add/).

## Setup
```
yarn install
```

## Build
```
yarn build
```

## Test
```
yarn test
```
