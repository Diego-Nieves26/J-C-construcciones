const { db, DataTypes } = require("../utils/database.util");

const GasStation = db.define(
  "gasStation",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pricePerGl: {
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
    tableName: "gasStation",
    timestamps: false,
  }
);

module.exports = { GasStation };
