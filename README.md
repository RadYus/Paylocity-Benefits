# Paylocity Benefits Challenge

_Created by Radim Sedlacek_

### Table of contents

1. [Install app dependencies](#installation)
2. [Set up environment variables](#environment-variables)
3. [Run the test](#running-the-tests)
4. [Defects](#defects)

## Installation

1. Node.js
   - Download and install from: https://nodejs.org/
   - To verify installation: `node -v` `npm -v`

2. Install dependencies: `npm i`

3. Install Playwright Browser: `npx playwright install`

## Environment variables:

1. Create a `.env` file in the project root
2. Add variables below and fill your username, password and authentication

   ```
   BENEFITS_USERNAME = ''
   BENEFITS_PASSWORD = ''
   BENEFITS_AUTHENTICATION = ''
   ```

## Running the tests

FE automated tests: [feTests.spec.js](automation/fe/feTests.spec.js)

BE automated tests: [beTests.spec.js](automation/be/beTests.spec.js)

BE tests can be run by command:

`npx playwright test automation/be/beTests.spec.js -g "API - All, serial test"`

FE tests can be run by commands:

`npx playwright test automation/fe/feTests.spec.js -g "FE - All, serial test"`

## Defects

[DEFECTS.md](resources/defects/defects.md)
