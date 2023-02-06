# Contract API

This is an API to manage contractors and clients

## Table of Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Testing](#testing)
- [Limitations](#limitations)

### Documentation

Documentation is hosted at [https://documenter.getpostman.com/view/13274153/2s935oM4SX](https://documenter.getpostman.com/view/13274153/2s935oM4SX)

## Technologies

- [NodeJS](https://nodejs.org/) - Runtime Environment
- [ExpressJs](https://expressjs.com/) - Web Application Framework
- [MySQL](https://www.mysql.com/) - Relational Database Management System
- [Sequelize](http://docs.sequelizejs.com/) - Promise-based ORM for Node.js

#### Compiler

- [Babel](https://babeljs.io/) - Compiler for Next Generation JavaScript
- [Nodemon](https://nodemon.io/) - Watches for file changes and restarts your server.


## Getting Started

### Installation

- Install [NodeJS](https://nodejs.org/) and [MySQL](https://www.mysql.com/) on your computer
- Install [Sequelize-CLI](https://www.npmjs.com/package/sequelize-cli) globally
- Clone this repository 
- Use the `.env.example` file to setup your environmental variables and rename the file to `.env`
- Run `npm install` to install all dependencies
- Run `npm run db:migrate` to setup your database
- You can run `npm run seed` to use the seed data provided
- Run `npm run dev` to start the development server
- Navigate to [localhost:4040/api/v1](http://localhost:4040/api/v1) to access the application


### Testing

#### Prerequisites

- [Postman](https://getpostman.com/) - API Toolchain

#### Testing with Postman

- After installing as shown above
- Navigate to [localhost:4040](http://localhost:8000/) in
  [Postman](https://getpostman.com/) to access the application

## Limitations
- It is not containerized
- No unit and e2e tests
