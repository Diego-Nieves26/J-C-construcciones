const express = require("express");

// Controllers
const {
  createGasStation,
  disableGasStation,
  getAllActiveGasStations,
} = require("../controllers/gasStation.controller");

// Middlewares
const {
  createGasStationValidator,
} = require("../middlewares/validators.middleware");
const { gasStationExists } = require("../middlewares/gasStation.middlewares");
const {
  protectSession,
  userIsAdmin,
} = require("../middlewares/auth.middleware");

const gasStationRouter = express.Router();

//Routes

gasStationRouter.use(protectSession);

gasStationRouter.post(
  "/create",
  userIsAdmin,
  createGasStationValidator,
  createGasStation
);

gasStationRouter.get("/", getAllActiveGasStations);

gasStationRouter.delete(
  "/delete/:id",
  userIsAdmin,
  gasStationExists,
  disableGasStation
);

module.exports = { gasStationRouter };
