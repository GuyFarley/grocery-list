'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('item', {
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};