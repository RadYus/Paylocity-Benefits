# Paylocity Benefits Challenge

_Created by Radim Sedlacek_

### Table of contents

1. [Preconditions for test run](#preconditions)
1. [Install app dependencies](#installation)
1. [Set up environment variables](#environment-variables)
1. [Run the test](#running-the-tests)
1. [Defects](#defects)

## Preconditions

1. Visual Studio Code is installed
2. The repository is cloned locally.

## Installation

1. Node.js
   - Download and install from: https://nodejs.org/
   - VS Code may need to be restarted afterward.
   - To verify installation: `node -v` `npm -v`
2. Install dependencies: `npm i`
3. Install Playwright Browser: `npx playwright install`
4. In VSC, go to "Extensions" and install "Playwright Test for VSCode"

## Environment variables:

1. Create a `.env` file in the project root
2. Add variables below and fill in your username, password and authentication

   ```
   BENEFITS_USERNAME = ''
   BENEFITS_PASSWORD = ''
   BENEFITS_AUTHENTICATION = ''
   ```

## Running the tests

FE automated tests: [feTests.spec.js](automation/fe/feTests.spec.js)

BE automated tests: [beTests.spec.js](automation/be/beTests.spec.js)

### Run BE tests:

`npx playwright test automation/be/beTests.spec.js -g "API - All, serial test"`

### Run FE tests:

`npx playwright test automation/fe/feTests.spec.js -g "FE - All, serial test"`

## Defects

[DEFECTS.md](resources/defects/defects.md)
