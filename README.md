<p align="middle">
  <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle"><code>RIF Identity Manager</code></h3>
<p align="middle">
  React.js template with Typescript, Eslint, Enzyme and CircleCI
</p>
<p align="middle">
  <a href="https://circleci.com/gh/rsksmart/rif-identity-manager">
    <img src="https://img.shields.io/circleci/build/github/rsksmart/rif-identity-manager?label=CircleCI" alt="npm" />
  </a>
  <a href="https://lgtm.com/projects/g/rsksmart/rif-identity-manager/alerts/">
    <img src="https://img.shields.io/lgtm/alerts/github/rsksmart/rif-identity-manager" alt="Alerts">
  </a>
  <a href="https://lgtm.com/projects/g/rsksmart/rif-identity-manager/context:javascript">
    <img src="https://img.shields.io/lgtm/grade/javascript/github/rsksmart/rif-identity-manager" alt="Code Quality">
  </a>
</p>

## Available Scripts

### `yarn`

Install project dependencies

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn test`

Runs the tests, displays coverage, and runs the linter. See below for more specific commands

#### `yarn test:watch`

Launches the test runner in the interactive watch mode.

#### `yarn test:coverage`

Runs the test coverage and saves the report in the`coverage` folder. 

#### `yarn lint`

Runs the linter and returns status.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### CI scripts

#### `yarn test:ci`

Runs the test coverage and saves the report in the`reports` folder. Uses `maxWorkers=2` - CircleCI recommendation

#### `yarn test:ci`

Runs the linter and saves the report in the`reports` folder.

## Knowledge base

This project was bootstrapped with the Typescript tempalte of [Create React App](https://github.com/facebook/create-react-app) and added Eslint, CircleCI, and Enzyme testing utility.

Current React.js version: `v17.0.1`, but Enzyme is set up for `v16` - this will be upgraded when Enzyme releases a new version.
