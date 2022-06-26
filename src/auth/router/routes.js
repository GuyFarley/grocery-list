// 'use strict';

// const bearerAuth = require('../middleware/bearer');
// const acl = require('../middleware/acl');

// app.get('/read', bearerAuth, acl('read'), (req, res, next) => {
//   res.status(200).send('OK! I have read permissions');
// });

// app.get('/create', bearerAuth, acl('create'), (req, res, next) => {
//   res.status(200).send('OK! I have create permissions');
// });

// app.get('/update', bearerAuth, acl('update'), (req, res, next) => {
//   res.status(200).send('OK! I have update permissions');
// });

// app.get('/delete', bearerAuth, acl('delete'), (req, res, next) => {
//   res.status(200).send('OK! I have delete permissions');
// });