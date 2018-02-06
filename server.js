/* eslint-disable */

const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const db = require('./db');
const Contact = db.models.Contact;

app.use(require('body-parser').urlencoded());
app.use(require('method-override')('_method'));

nunjucks.configure({ noCache: true });

app.use((req, res, next) => {
  res.locals.path = req.url
  next();
})

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/contacts', require('./routes/contacts.js'));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);


db.sync()
  .then(() => db.seed());

app.get('/', (req, res, next) => {
  res.render('index', {title: 'Home', pageh1: 'Contact Application'})
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`))

