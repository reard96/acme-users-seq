const app = require('express').Router();
const db = require('../db');
const user = db.models.User;

module.exports = app;

// same as homepage
app.get('/', (req, res, next) => {
  user.findAll({})
    .then(users => {
      res.render('users', { users, title: 'Users' });
    })
    .catch(next);
});

app.get('/:id', (req, res, next) => {
  user.findById(req.params.id)
    .then(user => {
      res.render('user', { title: `User: ${ user.name }`, user });
    })
    .catch(next);
});

app.delete('/:id', (req, res, next) => {
  user.findById(req.params.id)
    .then(myUser => {
      myUser.destroy();
    })
    .then(() => res.redirect('/users'))
    .catch(next);
});

app.post('/', (req, res, next) => {
  user.create(req.body)
    .then(() => res.redirect('/users'))
    .catch(next);
});
