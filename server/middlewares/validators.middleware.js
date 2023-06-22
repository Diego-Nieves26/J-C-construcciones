const { body, validationResult } = require("express-validator");

//Utils
const { AppError } = require("../utils/appError.util");

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map((err) => err.msg);
    const message = errorMsgs.join(". ");

    return next(new AppError(message, 400));
  }
  next();
};

const createUserValidator = [
  body("name").notEmpty().withMessage("Falta el campo Nombre"),
  body("email").isEmail().withMessage("Proporciona un correo valido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .isAlphanumeric()
    .withMessage("La contraseña debe contener letras y números"),
  body("role").notEmpty().withMessage("Rol no asignado"),
  checkResult,
];

const createPreUserValidator = [
  body("name").notEmpty().withMessage("Falta el campo Nombre"),
  body("email").isEmail().withMessage("Proporciona un correo valido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .isAlphanumeric()
    .withMessage("La contraseña debe contener letras y números"),
  checkResult,
];

const createSupplierValidator = [
  body("name").notEmpty().withMessage("Falta el campo Nombre"),
  body("dni")
    .isLength({ min: 8 })
    .withMessage("El campo DNI debe tener 8 caracteres")
    .isNumeric()
    .withMessage("El DNI debe contener solo números"),
  checkResult,
];

const createDriverValidator = [
  body("name").notEmpty().withMessage("Falta el campo Nombre"),
  body("dni")
    .isLength({ min: 8 })
    .withMessage("El campo DNI debe tener 8 caracteres")
    .isNumeric()
    .withMessage("El DNI debe contener solo números"),
  body("placa").notEmpty().withMessage("Falta el campo Placa"),
  checkResult,
];

const createCompanyValidator = [
  body("name").notEmpty().withMessage("Falta el campo Nombre"),
  body("ruc").notEmpty().withMessage("Falta el campo RUC"),
  checkResult,
];

module.exports = {
  createUserValidator,
  createPreUserValidator,
  createSupplierValidator,
  createDriverValidator,
  createCompanyValidator,
};
