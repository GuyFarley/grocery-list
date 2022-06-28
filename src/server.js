'use strict';

// 3rd party rss
const express = require('express');
const bcrypt = require('bcrypt');
const { Users, Items } = require('./models/index');
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');
const acl = require('./middleware/acl');

// instantiate express with Singleton
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.post('/signup', async (req, res, next) => {
//   req.body.password = await bcrypt.hash(req.body.password, 5);

//   let user = await Users.create(req.body);
//   res.status(200).send(user);
// });

app.get('/users', bearerAuth, async (req, res, next) => {
  const userRecords = await Users.findAll({});
  // const list = userRecords.map(user => user.username);
  res.status(200).json(userRecords);
});

// Role Based Access Control Routes
app.get('/read', bearerAuth, acl('read'), (req, res, next) => {
  res.status(200).send('OK! I have read permissions');
});

app.get('/create', bearerAuth, acl('create'), (req, res, next) => {
  res.status(200).send('OK! I have create permissions');
});

app.get('/update', bearerAuth, acl('update'), (req, res, next) => {
  res.status(200).send('OK! I have update permissions');
});

app.get('/delete', bearerAuth, acl('delete'), (req, res, next) => {
  res.status(200).send('OK! I have delete permissions');
});



// post
app.post('/item', bearerAuth, acl('create'), async (req, res, next) => {
  let item = req.body;
  console.log(req.body);

  let response = await Items.create(item);
  res.status(200).send(response);
});

// get
app.get('/item', bearerAuth, acl('read'), async (req, res, next) => {
  let allItems = await Items.findAll();
  res.status(200).send(allItems);
});

// get one
app.get('/item/:id', bearerAuth, acl('read'), async (req, res, next) => {
  let { id } = req.params;
  let oneItem = await Items.findOne({ where: { id } });
  res.status(200).send(oneItem);
});

// put
app.put('/item/:id', bearerAuth, acl('update'), async (req, res, next) => {
  let { id } = req.params;

  await Items.update(req.body, { where: { id } });
  let updatedItem = await Items.findOne({ where: { id } });
  res.status(200).send(updatedItem);
});

// delete
app.delete('/item/:id', bearerAuth, acl('delete'), async (req, res, next) => {
  let { id } = req.params;
  let deletedItem = await Items.findOne({ where: { id } });

  await Items.destroy({ where: { id } });
  res.status(200).send(deletedItem);
});


app.post('/signup', handleSignup);
app.post('/signin', basicAuth, handleSignin);
app.get('/users', bearerAuth, handleGetUsers);
app.get('/secret', bearerAuth, handleSecret);


async function handleSignup(req, res, next) {
  try {
    let userRecord = await Users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await Users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send('Welcome to the secret area!');
}

module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('server running on', PORT)),
};