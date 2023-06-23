const express = require("express");

// Controllers
const {
  createUnit,
  disableUnit,
  getAllActiveUnits,
} = require("../controllers/unit.controller");

// Middlewares
const { createUnitValidator } = require("../middlewares/validators.middleware");
const { unitExists } = require("../middlewares/unit.middleware");
const {
  protectSession,
  userIsAdmin,
} = require("../middlewares/auth.middleware");

const unitRouter = express.Router();

//Routes

unitRouter.use(protectSession);

unitRouter.post("/create", userIsAdmin, createUnitValidator, createUnit);

unitRouter.get("/", getAllActiveUnits);

unitRouter.delete("/delete/:id", userIsAdmin, unitExists, disableUnit);

module.exports = { unitRouter };
