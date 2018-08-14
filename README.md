# RedditData

> Simple Reddit leader board created for learning purposes

<img src="https://i.imgur.com/PE0AFOr.png" />

## Installation

Clone repository and install dependencies
```sh
$ git clone git@github.com:SmithPeder/reddit-data.git
$ cd reddit-data
$ npm install
  ...
  ...
$ npm start
```
The leader board should be up and running on [localhost:3000](localhost:3000)

## Documentation

### React, webpack, babel
This project is created using `React 16.4`. It uses a `webpack-dev-server` and
compiles `ES6` using `babel`. 

### CSS-modules
For styling it uses my boilerplate css-modules preset that can be found 
[here](https://github.com/SmithPeder/css-modules), which builds on 
[css-modules](https://github.com/css-modules/css-modules). This allows scoped
styling by hashing the classNames for each component.

### Prettier
`Prettier` makes sure that all the JS is auto-formatted correctly. As of writing
this the project is using `version: 1.14.2`.

### Linting
For linting `ESLint` is used to maintain code consistency and quality code.
`ESLint` is a dev-dependency in the project so its installed with npm install. Run
the linter
```sh
$ npm run lint
```
Lighting rules are listed in `.eslintrc.json`. It extends Airbnb and prettier
linting rules. It also specifies the use of single ' over " at the bottom of
`package.json`.

