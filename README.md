# TypeScript KOA Boilerplate

Basic boilerplate for Node.js development with TypeScript, KOA, koa-router, koa-helmet, @koa/cors, koa-bodyparser, koa-requestid, ESLint, Prettier, Airbnb styleguide, Mocha, Chai, istanbul, tsc-watch, supertest, sinon.js, pino, tsc-watch

[![Node.js CI](https://github.com/bitzr01/typescript-koa-boilerplate/actions/workflows/node.js.yml/badge.svg)](https://github.com/bitzr01/typescript-koa-boilerplate/actions/workflows/node.js.yml)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/9fb6893882b34716a0a7ad97eea21ac1)](https://www.codacy.com/gh/bitzr01/typescript-koa-boilerplate/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bitzr01/typescript-koa-boilerplate&amp;utm_campaign=Badge_Grade)

<!-- [![Build Status](https://travis-ci.com/alphabit1/nodejs-typescript-boilerplate.svg?branch=main)](https://travis-ci.com/alphabit1/nodejs-typescript-boilerplate) -->

<!--[![Coverage Status](https://coveralls.io/repos/github/bitzr01/typescript-boilerplate/badge.svg?branch=main)](https://coveralls.io/github/bitzr01/typescript-boilerplate?branch=main)-->

[<img alt="MIT Licence" src="https://badges.frapsoft.com/os/mit/mit.svg?v=103">](https://opensource.org/licenses/mit-license.php)

This boilerplate includes the following features:

-   Koa HTTP server with [koa-router](https://github.com/ZijianHe/koa-router), [koa-helmet](https://github.com/venables/koa-helmet#readme), [@koa/cors](https://github.com/koajs/cors), [koa-bodyparser](https://github.com/koajs/bodyparser) and [koa-requestid](https://github.com/uphold/koa-requestid/),
-   Error handling
-   Health module
-   Request logging with [pino](https://github.com/pinojs/pino)
-   Response time header using [moment.js](https://momentjs.com/)
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
