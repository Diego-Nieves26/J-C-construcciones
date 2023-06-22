const dotenv = require("dotenv");

// Models
const { Company } = require("../models/company.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

dotenv.config({ path: "./config.env" });

const createCompany = catchAsync(async (req, res, next) => {
  const { name, ruc } = req.body;

  const newCompany = await Company.create({
    name,
    ruc,
  });

  res.status(201).json({
    status: "success",
    message: "¡Proceso exitoso!",
    newCompany,
  });
});

const getAllActiveCompanies = catchAsync(async (req, res, next) => {
  const companies = await Company.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    message: "¡Proceso exitoso!",
    companies,
  });
});

const disableCompany = catchAsync(async (req, res, next) => {
  const { company } = req;

  await company.update({ status: "disable" });

  res.status(201).json({ status: "success", message: "¡Proceso exitoso!" });
});

module.exports = {
  createCompany,
  getAllActiveCompanies,
  disableCompany,
};
