const express = require('express');
const app = express();
const db = require('./db');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

const returnError = app.get('/error', (req, res, next) => {
  res.render('error', { title: 'Error'});
});

app.use('/users', require('./routes/users.js'));

db.sync((err) => {
  if (err) {
    return returnError;
  }
  db.getUsers ((err, users) => {
    if (err) {
      return returnError;
    }
    db.seed((err) => {
      if (err) {
        return returnError;
      }
      db.getUsers((err, users) => {
        if (err) {
          return returnError;
        }
        console.log(`there are ${users.length} users`);
        db.getUser(2, (err, user) => {
          if (err) return console.log(err);
          console.log(`user with an id of 2 is ${user.name}`);
        });
      });
    });
  });
});
