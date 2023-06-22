// Models
const { Supplier } = require("../models/supplier.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const supplierExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const supplier = await Supplier.findOne({ where: { id, status: "active" } });

  if (!supplier) {
    return next(new AppError("Proveedor no existente", 404));
  }

  req.supplier = supplier;
  next();
});

module.exports = { supplierExists };
