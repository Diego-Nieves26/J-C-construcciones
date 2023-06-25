const { db, DataTypes } = require("../utils/database.util");

const Journey = db.define(
  "journey",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    loadedTons: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    suplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departureDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isConpleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
      allowNull: false,
    },
  },
  {
    tableName: "journey",
    timestamps: false,
  }
);

module.exports = { Journey };
