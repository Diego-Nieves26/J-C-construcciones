// Models
const { GasStation } = require("../models/gasStation.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const gasStationExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const gasStation = await GasStation.findOne({
    where: { id, status: "active" },
  });

  if (!gasStation) {
    return next(new AppError("Grifo no existente", 404));
  }

  req.gasStation = gasStation;
  next();
});

module.exports = { gasStationExists };
