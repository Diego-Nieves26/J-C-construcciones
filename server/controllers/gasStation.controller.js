const dotenv = require("dotenv");

// Models
const { GasStation } = require("../models/gasStation.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

dotenv.config({ path: "./config.env" });

const createGasStation = catchAsync(async (req, res, next) => {
  const { name, pricePerGl } = req.body;

  const newGasStation = await GasStation.create({
    name,
    pricePerGl,
  });

  res.status(201).json({
    status: "success",
    message: "¡Proceso exitoso!",
    newGasStation,
  });
});

const getAllActiveGasStations = catchAsync(async (req, res, next) => {
  const gasStations = await GasStation.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    message: "¡Proceso exitoso!",
    gasStations,
  });
});

const disableGasStation = catchAsync(async (req, res, next) => {
  const { gasStation } = req;

  await gasStation.update({ status: "disable" });

  res.status(201).json({ status: "success" });
});

module.exports = {
  createGasStation,
  getAllActiveGasStations,
  disableGasStation,
};
