const express = require('express');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

const app = express();
app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());
app.set('view enginge', 'html');
app.engine('html', nunjucks.render);

const port = process.env.PORT || 3000;


const db = require('./db');

db.sync();
