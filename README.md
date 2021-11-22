![](https://github.com/malsioufi/cognigy-case/workflows/Tests/badge.svg)

# cognigy-case

Technical test for backend developer role at Cognigy.

### Prerequisits

The application was developed using the following as prerequisits:

* Node: v16.13.0
* npm: v8.1.3
* MongoDB: v5.0.4
* Docker: v20.10.10
* Docker Compose: v2.1.1

## Running In Development Environment

1. Install the dependencies:
   ```
   npm install
   ```
2. Run the development server:
   ```
   npm run watch
   ```
3. The development server runs on port `3000` by default. It will be accesible via http://localhost:3000

## Running In Production environment

1. You can run the application with `docker-compose` using:

   ```
   docker-compose up --build -d
   ```

2. The production server runs on port `3001` by default. It will be accesible via http://localhost:3001


## Running the tests

1. Install the dependencies. Skip if you have already done this:
   ```
   npm install
   ```
2. Run the tests:
   ```
   npm run test
   ```
   * If you want to run in watch mode, instead you can use:
        ```
        npm run test:watch
        ```

## API Documentation

You can access the API documentation on `/api-docs`

* Dev Docs: http://localhost:3000/api-docs
* Prod Docs: http://localhost:3001/api-docs

## Future Improvements

* Add unit tests in addition to the current E2E ones.
* ~~Add `x-api-key` based authentication.~~
* Add more tests for `x-api-key` based authentication to cover all cases.
* Add a service to manage API keys in the database.
* Add logging to the server.
* Add monitoring metrics to track the server's health.


## Cognigy's Checklist

> The following things are important and we will have a look at specifically them:

* [x] is your implementation functional, can it be dockerized, started and can it connect to MongoDB?
  * Yup! Just follow the steps above.
* [x] naming variables & files
  * The hardest part of our job! 😂
* [x] ~~usage of comments~~
  * Clean code doesn't need comments!
* [x] common file indentation for all of your files
  * Linted with `ESLint` and formatted using `Prettier`.
* [x] is there any information on how to use your implementation (e.g. `README.md`)? We want to get your application running, so give us a step-by-step guide of what we need to do!
  * Absolutely!