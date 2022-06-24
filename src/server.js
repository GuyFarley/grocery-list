'use strict';

const express = require('express');
const errorHandler = require('./error-handlers/500');
const notFoundHandler = require('./error-handlers/404');
const itemRouter = require('./routes/list-item');

const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(itemRouter);
app.use(notFoundHandler);
app.use(errorHandler);


module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('listening on port', PORT)),
};