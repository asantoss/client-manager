"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateDue: {
        type: Sequelize.DATE
      },
      products: {
        type: Sequelize.JSON,
        defaultValue: "[]"
      },
      total: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isPaid: {},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Invoices");
  }
};
