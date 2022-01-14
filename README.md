# TypeScript Boilerplate

Basic boilerplate for Node.js development with TypeScript, ESLint, Prettier, Airbnb styleguide, Mocha, Chai, istanbul, tsc-watch

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/887c0ee5aa8549a9bb32b84b172e5f12)](https://www.codacy.com/gh/bitzr01/typescript-boilerplate/dashboard?utm_source=github.com&utm_medium=referral&utm_content=bitzr01/typescript-boilerplate&utm_campaign=Badge_Grade)

<!-- [![Build Status](https://travis-ci.com/alphabit1/nodejs-typescript-boilerplate.svg?branch=main)](https://travis-ci.com/alphabit1/nodejs-typescript-boilerplate) -->

<!--[![Coverage Status](https://coveralls.io/repos/github/bitzr01/typescript-boilerplate/badge.svg?branch=main)](https://coveralls.io/github/bitzr01/typescript-boilerplate?branch=main)-->

[<img alt="MIT Licence" src="https://badges.frapsoft.com/os/mit/mit.svg?v=103">](https://opensource.org/licenses/mit-license.php)

This boilerplate includes the following features:

-   Easy development with [tsc-watch](https://github.com/gilamran/tsc-watch#readme) and [pino-pretty](https://github.com/pinojs/pino-pretty)
-   Linting with [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) and.
-   Formatting with [Prettier](https://prettier.io/) and [Airbnb styleguide](https://github.com/airbnb/javascript).
-   Testing with Test Coverage using [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/) and [istanbul](https://istanbul.js.org/)

## install

```zsh
git clone https://github.com/bitzr01/typescript-boilerplate <project-name>
cd <project-name>
rm -rf .git && git init     # remove git and initialize new git
npm i                       # install dependencies
```

## Commands

> Run

```zsh
npm run clean       # remove all generated
npm run build       # clean and build dist
npm run start       # start node
npm run dev         # tsc-watch and start with debugger
```

> Test

```zsh
npm run test        # Run all test
npm run coverage    # Calculate the coverage of all
npm run lint        # Lint all sourcecode
```
