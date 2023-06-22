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
    dni: {
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
