const express = require("express");

// Controllers
const {
  createUser,
  login,
  getAllActiveUsers,
  updateRoleUser,
  disableUser,
  checkToken,
} = require("../controllers/users.controller");

// Middlewares
const { createUserValidator } = require("../middlewares/validators.middleware");
const { userExists } = require("../middlewares/users.middleware");
const {
  protectSession,
  userIsAdmin,
} = require("../middlewares/auth.middleware");

const usersRouter = express.Router();

//Routes

usersRouter.post("/signup", createUserValidator, createUser);

usersRouter.post("/login", login);

usersRouter.use(protectSession);

usersRouter.get("/", getAllActiveUsers);

usersRouter.get("/check-token", checkToken);

usersRouter.patch("/update/:id", userExists, userIsAdmin, updateRoleUser);

usersRouter.delete("/delete/:id", userExists, userIsAdmin, disableUser);

module.exports = { usersRouter };
