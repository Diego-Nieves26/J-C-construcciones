const { db, DataTypes } = require("../utils/database.util");

const Company = db.define(
  "company",
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
    ruc: {
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
    tableName: "company",
    timestamps: false,
  }
);

module.exports = { Company };
