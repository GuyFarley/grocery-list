'use strict';

const { Users } = require('../models')

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login') }

    const token = req.headers.authorization.split(' ').pop();
    console.log('Bearer.js ', token);
    console.log(Users);
    const validUser = await Users.authenticateToken(token);
    if (validUser) {
      console.log('user ', validUser);
      req.user = validUser;
      req.token = validUser.token;
      next();
    }
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
}