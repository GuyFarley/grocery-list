
'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const itemSchema = require('./item.schema');
const userModel = require('../auth/models/users')

const DATABASE_URL = 'test' ? 'sqlite::memory' : 'sqlite:memory';

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const ItemModel = itemSchema(sequelize, DataTypes);
const UserModel = userModel(sequelize, DataTypes)

module.exports = {
  sequelize,
  ItemModel,
  UserModel,
};