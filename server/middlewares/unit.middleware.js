// Models
const { Unit } = require("../models/unit.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const unitExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const unit = await Unit.findOne({ where: { id, status: "active" } });

  if (!unit) {
    return next(new AppError("Unidad no existente", 404));
  }

  req.unit = unit;
  next();
});

module.exports = { unitExists };
