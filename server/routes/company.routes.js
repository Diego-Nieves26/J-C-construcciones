const express = require("express");

// Controllers
const {
  createCompany,
  disableCompany,
  getAllActiveCompanies,
} = require("../controllers/company.controller");

// Middlewares
const {
  createCompanyValidator,
} = require("../middlewares/validators.middleware");
const { companyExists } = require("../middlewares/company.middleware");
const { protectSession } = require("../middlewares/auth.middleware");

const companyRouter = express.Router();

//Routes

companyRouter.use(protectSession);

companyRouter.post("/create", createCompanyValidator, createCompany);

companyRouter.get("/", getAllActiveCompanies);

companyRouter.delete("/delete/:id", companyExists, disableCompany);

module.exports = { companyRouter };
