const dotenv = require("dotenv");

// Models
const { Supplier } = require("../models/supplier.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

dotenv.config({ path: "./config.env" });

const createSupplier = catchAsync(async (req, res, next) => {
  const { name, pricePerTon, payPerTon } = req.body;

  const newSupplier = await Supplier.create({
    name,
    pricePerTon,
    payPerTon,
  });

  res.status(201).json({
    status: "success",
    message: "¡Proceso exitoso!",
    newSupplier,
  });
});

const getAllActiveSuppliers = catchAsync(async (req, res, next) => {
  const suppliers = await Supplier.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    message: "¡Proceso exitoso!",
    suppliers,
  });
});

const disableSupplier = catchAsync(async (req, res, next) => {
  const { supplier } = req;

  await supplier.update({ status: "disable" });

  res.status(201).json({ status: "success", message: "¡Proceso exitoso!" });
});

module.exports = {
  createSupplier,
  getAllActiveSuppliers,
  disableSupplier,
};
