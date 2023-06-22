// Models
const { Company } = require("../models/company.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const companyExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const company = await Company.findOne({ where: { id, status: "active" } });

  if (!company) {
    return next(new AppError("Empresa no existente", 404));
  }

  req.company = company;
  next();
});

module.exports = { companyExists };
