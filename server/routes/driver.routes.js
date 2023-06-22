const express = require("express");

// Controllers
const {
  createDriver,
  disableDriver,
  getAllActiveDrivers,
} = require("../controllers/driver.controller");

// Middlewares
const {
  createDriverValidator,
} = require("../middlewares/validators.middleware");
const { driverExists } = require("../middlewares/driver.middleware");
const { protectSession } = require("../middlewares/auth.middleware");

const driverRouter = express.Router();

//Routes

driverRouter.use(protectSession);

driverRouter.post("/create", createDriverValidator, createDriver);

driverRouter.get("/", getAllActiveDrivers);

driverRouter.delete("/delete/:id", driverExists, disableDriver);

module.exports = { driverRouter };
