# Nest Js Forex Trading System Assignment

This assignment is a Forex Trading System using Nest.js. It implements several APIs that allow users to top up their account, fetch live FX conversion rates, perform FX conversions, and check the account balances.

## Task Description

### Step 1

- Your task is to create a FX rate syncing application.
- The system fetches live FX conversion rates from alphavantage.co and stores them in memory.
- Each rate is valid for 30 seconds.
- Your system has to be smart enough to store the most relevant FX rates.

### Step 2

Your task is to implement the following APIs:

1. **Top Up Account API**

   - **Endpoint:** `POST /accounts/topup`
   - **Request body:** `{ "currency": "USD", "amount": 100 }`
   - **Description:** This API allows users to top up their account with a specified amount in a given currency.

2. **FX Rate API**

   - **Endpoint:** `GET /fx-rates`
   - **Description:** This API fetches live FX conversion rates from memory stored in STEP 1.
   - The system generates a quoteId and sends it in the response to the client.
   - **Response:** `{ "quoteId": "12345", "expiry_at": "12345"}`

3. **FX Conversion API**

   - **Endpoint:** `POST /fx-conversion`
   - **Request body:** `{ "quoteId": "12345", "fromCurrency": "USD", "toCurrency": "EUR", "amount": 100 }`
   - **Description:** This API performs an FX conversion using the provided quoteId and converts the specified amount from one currency to another.
   - **Response:** `{ "convertedAmount": 90.53, "currency": "EUR"}`

4. **Balance API**
   - **Endpoint:** `GET /accounts/balance`
   - **Description:** This API retrieves the balances in all currencies for the user's account.
   - **Response:** `{ "balances": { "USD": 1000, "EUR": 500, "GBP": 300 } }`

## Installation

```bash
$ npm install
```

## Prerequisite

Create a .env file, and add your API key

```bash
API_KEY=your_api_key_here
```

### You can get your API key from https://www.alphavantage.co/support/#api-key OR you can also use this API key **RRD08OVEDV37N30P** in the **fxRates.service.ts** file.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```

## To Access APIs

Open web browser, and go to **http://localhost:3000/api#** to view Swagger UI and access the APIs

##

## About the Implementation

### Both the Step 1 and Step 2 are implemented following the below Guidelines

- Used Nest.js to build the backend system.
- Utilized the Alphavantage API to fetch
  live FX conversion rates.
- The system should stores the fetched FX rates for future reference.
- Ensured proper error handling and validation for API inputs.
- Implemented the APIs using appropriate Nest.js decorators and modules.
- Documented the API endpoints and their usage using Swagger
  (https://swagger.io).
- Used appropriate design patterns and best practices are implementated.
- Included a README file with instructions on how to set up and run your application.
- Added appropriate unit tests for your application.
