const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

app.get('/users', (req, res, next) => {
  db.getUsers((err, users) => {
    if (err) return next(err);
    res.send(users);
  });
});

app.get('/users/:id', (req, res, next) => {
  db.getUser(req.params.id, (err, user) => {
    if (err) return next(err);
    res.send(user);
  });
});

const db = require('./db');

db.sync((err) => {
  if (err) return console.log(err);
  db.getUsers ((err, users) => {
    if (err) return console.log(err);
    console.log(`there are ${users.length} users`);
    db.seed((err) => {
      if (err) return console.log(err);
      db.getUsers((err, users) => {
        if (err) return console.log(err);
        console.log(`there are ${users.length} users`);
        db.getUser(2, (err, user) => {
          if (err) return console.log(err);
          console.log(`user with an id of 2 is ${user.name}`);
        });
      });
    });
  });
});
