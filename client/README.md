# Client

This is the data lake's Vue.js client. This is a stand alone frontend, and is not served by any api. This is the portal that
users can use to view and edit data with the help of the api. The client is meant to be simple with it's processing. We dont want too many logical expressions executing on the client, and would prefer that work be pushed to the api.

## Summary

  - [Getting Started](#getting-started)
  - [Authors](#authors)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)
  
## Getting Started

These instructions will get you a copy of the client up and running on
your local machine for development and testing purposes.

### Prerequisites

  - [Node.js](https://nodejs.org/en/download/) - Javascript framework, used to compile and run code
  - [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - Node package manager
  - [Vue.js](https://cli.vuejs.org/guide/installation.html) - SPA used for the frontend

### Environment Setup

Step 1: Navigate to directory

    cd ./stat/client

Step 2: Create .env file

    touch .env

Step 3: Copy & Paste example into .env

    ; API
    VUE_APP_API_URL=http://127.0.0.1:3000

Step 4: Install packages

    npm install

Step 5: Start app

    npm run serve

### Build

Compiles and minifies for production

    npm run build

### Lint

Lints and fixes files

    npm run lint

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Other Setups

  - **API** - [Setup](../api)
  - **Harvester** - [Setup](../harvester)

## Authors

  - **Joshua Phillips** - *Portfolio* -
    [joshuadarron.com](https://joshuadarron.com/)

## License

This project is licensed under the [CC0 1.0 Universal](../../LICENSE.md)
Creative Commons License - see the [LICENSE.md](../../LICENSE.md) file for
details

## Acknowledgments

  - Hat tip to anyone whose code was used
