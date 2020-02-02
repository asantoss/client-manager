"use strict";
module.exports = (sequelize, DataTypes) => {
  const Invoices = sequelize.define(
    "Invoices",
    {
      dateDue: DataTypes.DATE,
      products: DataTypes.JSON,
      total: DataTypes.INTEGER
    },
    {}
  );
  Invoices.associate = function(models) {
    // associations can be defined here
    Invoices.belongsTo(models.Client);
  };
  return Invoices;
};
