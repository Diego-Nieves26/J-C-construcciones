const { db, DataTypes } = require("../utils/database.util");

const Supplier = db.define(
  "supplier",
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
    pricePerTon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payPerTon: {
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
    tableName: "supplier",
    timestamps: false,
  }
);

module.exports = { Supplier };
