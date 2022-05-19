## NightMoves Logistical Inventory Tracking System

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

A toy CRUD app for my application to the Shopify Internship Program


## Table of Contents

  - [Short Description](#short-description)
  - [Long Description](#long-description)
  - [Table of Contents](#table-of-contents-1)
  - [Background](#background)
  - [Install](#install)
  - [Usage](#usage)
  - [Extra Sections](#extra-sections)
  - [API](#api)
  - [Maintainers](#maintainers)
  - [Thanks](#thanks)
  - [Contributing](#contributing)
  - [License](#license)

### Background
This project was initially built as part of my application to the Shopify internship program for back end development and production engineering. 
For this project I chose an Express server with PostgreSQL for the database. The project uses the node-postgres library for the database driver. I wanted to keep it fairly barebones/lightweight to avoid adding unnecessary complexity and keep it performant. 

### Install
- Fork/Clone Repo
- Run `npm install` to install dependencies
- Create a `.env` file based on the existing `sample.env` configured with your secrets
  * This project is currently deployed live on replit which does not require configuring your own Postgres database instance / credentials.

### Usage
Local Development:
Server provides a simple webform UI for CRUD operations via `index.html` at home route

#### Scripts
- `npm run dev` will use `nodemon` to run the server in watch mode. There is not currently hot-reloading for browser so manual refresh is required for UI. Env variables will be loaded from .env file. (See `sample.env` for necessary config)

-`npm start` will launch server in production mode. This disables debug logging and relies on platform set environment variables.
### API
#### Utility Endpoints
- `/utils/ping` returns 'Pong' 
- `/utils/dbtest` verifies connection to DB and returns current timestamp

#### Inventory Endpoints
- `GET /api/inventory` returns all items in current inventory
- `GET /api/inventory/{id}` returns single item matching id
* `POST /api/inventory/create` creates new item
  * Fields:
  - `qty` 
  - `name`
  - `shortdesc`
  - `longdesc`
  - `city`

- `PATCH /api/inventory/update` updates item with any non blank fields
- `DELETE /api/inventory/delete/{id}` deletes item with matching {id}

#### Shipment Endpoints
- `GET /api/shipments/` returns all current shipments 
- `GET /api/shipments/{id}` returns single shipment matching id
* `POST /api/shipments/create` creates new shipment
  * Fields:
  - `dest` - shipping destination
  - `custname` - customer name
  - `items` - a JSON object of key/value pairs where key is the item id and value is the quantity

- `DELETE /api/shipments/delete/{id}` deletes item with matching {id}

### Contributing
Not accepting PRs at this time. Contact erich@zenlex.dev with questions. 

### License
**Status:** Required.

**Requirements:**
GNU General Public License v3.0 or later