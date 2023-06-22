const dotenv = require("dotenv");

// Models
const { Driver } = require("../models/driver.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

dotenv.config({ path: "./config.env" });

const createDriver = catchAsync(async (req, res, next) => {
  const { name, dni, placa } = req.body;

  const newDriver = await Driver.create({
    name,
    dni,
    placa,
  });

  res.status(201).json({
    status: "success",
    message: "¡Proceso exitoso!",
    newDriver,
  });
});

const getAllActiveDrivers = catchAsync(async (req, res, next) => {
  const drivers = await Driver.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    message: "¡Proceso exitoso!",
    drivers,
  });
});

const disableDriver = catchAsync(async (req, res, next) => {
  const { driver } = req;

  await driver.update({ status: "disable" });

  res.status(201).json({ status: "success", message: "¡Proceso exitoso!" });
});

module.exports = {
  createDriver,
  getAllActiveDrivers,
  disableDriver,
};
