'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./user-model');
const itemSchema = require('./item-model');

// use this code locally
// const DATABASE_URL = process.env.NODE_ENV === 'test'
//   ? 'sqlite::memory'
//   : process.env.DATABASE_URL || 'sqlite:memory';  // one colon allows us to persist

// const sequelize = new Sequelize(DATABASE_URL)

// this code for deployment
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL || 'postgres://localhost:5432/grocery-list';

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  sequelize,
  Users: userSchema(sequelize, DataTypes),
  Items: itemSchema(sequelize, DataTypes),
};