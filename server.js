const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use(require('method-override')('_method'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

app.use((req, res, next) => {
  res.locals.path = req.url;
  next();
});

const user = db.models.User;

app.get('/', (req, res, next) => {
  user.findAll({})
    .then(users => {
      res.render('index', { users, title: 'Welecome to ACME Users Sql' });
    })
    .catch(next);
});

app.use('/users', require('./routes/users.js'));

app.use((err, req, res, next) => {
  res.render('error', { error: err, title: 'Error' });
});

db.sync().then(() => db.seed());
