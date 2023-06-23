const dotenv = require("dotenv");

// Models
const { Unit } = require("../models/unit.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

dotenv.config({ path: "./config.env" });

const createUnit = catchAsync(async (req, res, next) => {
  const { licensePlate, typeOfVehicle } = req.body;

  const newUnit = await Unit.create({
    licensePlate,
    typeOfVehicle,
  });

  res.status(201).json({
    status: "success",
    message: "¡Proceso exitoso!",
    newUnit,
  });
});

const getAllActiveUnits = catchAsync(async (req, res, next) => {
  const units = await Unit.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    message: "¡Proceso exitoso!",
    units,
  });
});

const disableUnit = catchAsync(async (req, res, next) => {
  const { unit } = req;

  await unit.update({ status: "disable" });

  res.status(201).json({ status: "success" });
});

module.exports = {
  createUnit,
  getAllActiveUnits,
  disableUnit,
};
