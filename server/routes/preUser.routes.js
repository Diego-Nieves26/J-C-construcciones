const express = require("express");

// Controllers
const {
  createPreUser,
  deletePreUser,
  getAllPreUsers,
} = require("../controllers/preUser.controller");

// Middlewares
const {
  createPreUserValidator,
} = require("../middlewares/validators.middleware");
const { preUserExists } = require("../middlewares/preUser.middleware");
const { protectSession } = require("../middlewares/auth.middleware");

const preUsersRouter = express.Router();

//Routes

preUsersRouter.post("/create", createPreUserValidator, createPreUser);

preUsersRouter.use(protectSession);

preUsersRouter.get("/", getAllPreUsers);

preUsersRouter.delete("/delete/:id", preUserExists, deletePreUser);

module.exports = { preUsersRouter };
