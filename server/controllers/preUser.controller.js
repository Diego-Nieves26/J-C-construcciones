// Models
const { PreUser } = require("../models/preUser.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const createPreUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newPreUser = await PreUser.create({
    name,
    email,
    password,
  });

  newPreUser.password = undefined;

  res.status(201).json({
    status: "success",
    message: "¡Proceso exitoso!",
    newPreUser,
  });
});

const getAllPreUsers = catchAsync(async (req, res, next) => {
  const preUsers = await PreUser.findAll();

  res.status(200).json({
    status: "success",
    message: "¡Proceso exitoso!",
    preUsers,
  });
});

const deletePreUser = catchAsync(async (req, res, next) => {
  const { preUser } = req;

  await preUser.destroy();

  res.status(201).json({ status: "success", message: "¡Proceso exitoso!" });
});

module.exports = {
  createPreUser,
  getAllPreUsers,
  deletePreUser,
};
