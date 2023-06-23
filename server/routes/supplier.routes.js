const express = require("express");

// Controllers
const {
  createSupplier,
  disableSupplier,
  getAllActiveSuppliers,
} = require("../controllers/supplier.controller");

// Middlewares
const {
  createSupplierValidator,
} = require("../middlewares/validators.middleware");
const { supplierExists } = require("../middlewares/supplier.middleware");
const {
  protectSession,
  userIsAdmin,
} = require("../middlewares/auth.middleware");

const supplierRouter = express.Router();

//Routes

supplierRouter.use(protectSession);

supplierRouter.post(
  "/create",
  userIsAdmin,
  createSupplierValidator,
  createSupplier
);

supplierRouter.get("/", getAllActiveSuppliers);

supplierRouter.delete(
  "/delete/:id",
  userIsAdmin,
  supplierExists,
  disableSupplier
);

module.exports = { supplierRouter };
