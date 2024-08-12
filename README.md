<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


                           Tender Preparation Automation
This project automates the tender preparation process by generating and submitting data for various tender-related stages including general information, preparation details, submission, evaluation, and award. The project uses NestJS, Axios for HTTP requests, and Faker.js for generating random data.
_=I work in perago Information System for malawai Tender perpartion these is my Own Task

        Table of Contents
Project Structure
Setup
Environment Variables
Usage
Error Handling
API Endpoints
License
            Project Structure


├── src
│   ├── bidding.service.ts  # Main service for the bidding process
│   ├── app.module.ts       # NestJS module configuration
│   ├── main.ts             # Entry point for the application
├── .env                    # Environment variables
├── README.md               # Project documentation
└── package.json            # Node.js dependencies and scripts


Here's a README.md file tailored for your tender preparation automation project:

Tender Preparation Automation
This project automates the tender preparation process by generating and submitting data for various tender-related stages including general information, preparation details, submission, evaluation, and award. The project uses NestJS, Axios for HTTP requests, and Faker.js for generating random data.

Table of Contents
Project Structure
Setup
Environment Variables
Usage
Error Handling
API Endpoints
License
Project Structure
bash
Copy code
├── src
│   ├── bidding.service.ts  # Main service for the bidding process
│   ├── app.module.ts       # NestJS module configuration
│   ├── main.ts             # Entry point for the application
├── .env                    # Environment variables
├── README.md               # Project documentation
└── package.json            # Node.js dependencies and scripts
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/tender-preparation-automation.git
cd tender-preparation-automation
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add the required environment variables (see Environment Variables).

Run the application:

bash
Copy code
npm run start
Environment Variables
This project uses environment variables for configuration. Add the following variables to your .env file:

makefile
Copy code
WEB_TOKEN=your_jwt_token_here
WEB_TOKEN: Your JWT token for API authentication.
Usage
The project is structured to automate the tender preparation process by making HTTP POST requests to various API endpoints.

      Example Usage
The main service responsible for this process is BiddingService. It handles the following steps:

1.General Information (bds-generals)
2.Preparation Details (bds-preparations)
3.Submission Details (bds-submissions)
4.Evaluation Criteria (bds-evaluations)
5. Award Information (bds-awards)

      Error Handling
This project includes basic error handling for Axios requests. Common errors and their solutions:

504 Gateway Timeout: Indicates that the server took too long to respond. Check the server status or increase the timeout settings.
400 Bad Request: Often caused by duplicate key values (e.g., trying to insert a tenderId that already exists).

API Endpoints
The service interacts with the following API endpoints:

General Information: https://dev-bo.megp.peragosystems.com/tendering/api/bds-generals
Preparation Details: https://dev-bo.megp.peragosystems.com/tendering/api/bds-preparations
Submission Details: https://dev-bo.megp.peragosystems.com/tendering/api/bds-submissions
Evaluation Criteria: https://dev-bo.megp.peragosystems.com/tendering/api/bds-evaluations
Award Information: https://dev-bo.megp.peragosystems.com/tendering/api/bds-awards
and so on api ....


















