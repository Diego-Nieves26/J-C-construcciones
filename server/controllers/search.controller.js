// Models
const { Supplier } = require("../models/supplier.model");
const { GasStation } = require("../models/gasStation.model");
const { Unit } = require("../models/unit.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const searchSuppliers = catchAsync(async (req, res, next) => {
  const name = req.query.name;

  const suppliers = await Supplier.findAll({
    where: { status: "active" },
  });

  const suppliersRes = suppliers.filter((e) =>
    e.name.toLowerCase().startsWith(name.toLowerCase())
  );

  res.status(201).json({
    status: "success",
    suppliers: suppliersRes,
  });
});

const searchGasStations = catchAsync(async (req, res, next) => {
  const name = req.query.name;

  const gasStations = await GasStation.findAll({
    where: { status: "active" },
  });

  const gasStationsRes = gasStations.filter((e) =>
    e.name.toLowerCase().startsWith(name.toLowerCase())
  );

  res.status(201).json({
    status: "success",
    gasStations: gasStationsRes,
  });
});

const searchUnits = catchAsync(async (req, res, next) => {
  const licensePlate = req.query.licensePlate;

  const units = await Unit.findAll({
    where: { status: "active" },
  });

  const unitsRes = units.filter((e) =>
    e.licensePlate.toLowerCase().startsWith(licensePlate.toLowerCase())
  );

  res.status(201).json({
    status: "success",
    units: unitsRes,
  });
});

module.exports = {
  searchSuppliers,
  searchGasStations,
  searchUnits,
};
