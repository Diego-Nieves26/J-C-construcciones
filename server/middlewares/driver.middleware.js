// Models
const { Driver } = require("../models/driver.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const driverExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const driver = await Driver.findOne({ where: { id, status: "active" } });

  if (!driver) {
    return next(new AppError("Conductor no existente", 404));
  }

  req.driver = driver;
  next();
});

module.exports = { driverExists };
