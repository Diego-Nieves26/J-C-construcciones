const express = require("express");

const {
  searchSuppliers,
  searchGasStations,
  searchUnits,
} = require("../controllers/search.controller");

const searchRouter = express.Router();

//Routes

searchRouter.get("/suppliers", searchSuppliers);

searchRouter.get("/gas-stations", searchGasStations);

searchRouter.get("/units", searchUnits);

module.exports = { searchRouter };
