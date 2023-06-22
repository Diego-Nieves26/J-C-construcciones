// Models
const { PreUser } = require("../models/preUser.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const preUserExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const preUser = await PreUser.findOne({ where: { id } });

  if (!preUser) {
    return next(new AppError("Usuario no existente", 404));
  }

  req.preUser = preUser;
  next();
});

module.exports = { preUserExists };
