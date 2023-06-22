const express = require("express");

// Controllers
const {
  createUser,
  login,
  getAllActiveUsers,
  updateRoleUser,
  disableUser,
} = require("../controllers/users.controller");

// Middlewares
const { createUserValidator } = require("../middlewares/validators.middleware");
const { userExists } = require("../middlewares/users.middleware");
const {
  protectSession,
  protectUserAcoount,
} = require("../middlewares/auth.middleware");

const usersRouter = express.Router();

//Routes

usersRouter.post("/signup", createUserValidator, createUser);

usersRouter.post("/login", login);

usersRouter.use(protectSession);

usersRouter.get("/", getAllActiveUsers);

usersRouter.patch(
  "/update/:id",
  userExists,
  protectUserAcoount,
  updateRoleUser
);

usersRouter.delete("/delete/:id", userExists, protectUserAcoount, disableUser);

module.exports = { usersRouter };
