const { db, DataTypes } = require("../utils/database.util");

const Unit = db.define(
  "unit",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeOfVehicle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
      allowNull: false,
    },
  },
  {
    tableName: "unit",
    timestamps: false,
  }
);

module.exports = { Unit };
