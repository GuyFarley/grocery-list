'use strict';

const models = require(".");

const itemModel = (sequelize, DataTypes) => {
  const model = sequelize.define('item', {
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return model;
};

module.exports = itemModel;