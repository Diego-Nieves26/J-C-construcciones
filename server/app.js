const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

// Routers
const { usersRouter } = require("./routes/users.routes");
const { preUsersRouter } = require("./routes/preUser.routes");
const { supplierRouter } = require("./routes/supplier.routes");
const { driverRouter } = require("./routes/driver.routes");
const { unitRouter } = require("./routes/unit.routes");
const { gasStationRouter } = require("./routes/gasStation.routes");
const { searchRouter } = require("./routes/search.routes");

// Global err controller
const { globalErrorHandler } = require("./controllers/error.controller");

// Utils
const { AppError } = require("./utils/appError.util");

// Init express app
const app = express();

app.use(express.json());

// Helmet
app.use(helmet());

// Compression
app.use(compression());

// Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Cors
app.use(cors());

// Define endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/pre-users", preUsersRouter);
app.use("/api/v1/suppliers", supplierRouter);
app.use("/api/v1/drivers", driverRouter);
app.use("/api/v1/units", unitRouter);
app.use("/api/v1/gas-stations", gasStationRouter);
app.use("/api/v1/search", searchRouter);

// Handle incoming unknown routes to the server
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = { app };
