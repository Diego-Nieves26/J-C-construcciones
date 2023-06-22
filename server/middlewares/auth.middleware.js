const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

dotenv.config({ path: "./config.env" });

const protectSession = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Token invalido", 403));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: "active" },
  });

  if (!user || user.status !== "active") {
    return next(new AppError("El usuario de este token ya no existe.", 403));
  }

  req.sessionUser = user;
  next();
});

const protectUserAcoount = catchAsync(async (req, res, next) => {
  const { sessionUser, user } = req;

  if (!user.id.equals(sessionUser.id)) {
    return next(new AppError("No te pertenece esta cuenta", 403));
  }

  next();
});

module.exports = { protectSession, protectUserAcoount };
