const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

dotenv.config({ path: "./config.env" });

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    message: "¡Proceso exitoso!",
    newUser,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, status: "active" });

  if (!user) {
    return next(new AppError("Credenciales incorrectas", 404));
  }

  const isPasswordaValid = await bcrypt.compare(password, user.password);
  console.log(password, user.password);

  if (!isPasswordaValid) {
    return next(new AppError("Credenciales incorrectas", 404));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_TOKEN_IN,
  });

  res.status(201).json({
    status: "success",
    message: "¡Proceso exitoso!",
    token,
  });
});

const getAllActiveUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    message: "¡Proceso exitoso!",
    users,
  });
});

const updateRoleUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { role } = req.body;

  await user.update({ role });

  res.status(204).json({ status: "success", message: "¡Proceso exitoso!" });
});

const disableUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "disable" });

  res.status(204).json({ status: "success", message: "¡Proceso exitoso!" });
});

module.exports = {
  createUser,
  login,
  getAllActiveUsers,
  updateRoleUser,
  disableUser,
};
