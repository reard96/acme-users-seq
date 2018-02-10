const app = require('express').Router();
const db = require('../db');

module.exports = app;

app.get('/', (req, res, next) => {
  res.render('users', { title: 'Users', users: db.getUsers() });
});

app.get('/:id', (req, res, next) => {
  const user = db.getUser(req.params.id);
  res.render('user', { title: `User: ${ user.name }`, user });
});
