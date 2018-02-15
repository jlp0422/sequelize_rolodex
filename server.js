/* eslint-disable */

const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const db = require('./db');
const { Contact } = db.models;
const faker = require('faker')


app.use(require('body-parser').urlencoded());
app.use(require('method-override')('_method'));

nunjucks.configure({ noCache: true });

app.use((req, res, next) => {
  res.locals.path = req.url
  next();
})

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/vendor', express.static(path.join(__dirname, 'stylesheets')));
app.use('/contacts', require('./routes/contacts.js'));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.get('/', (req, res, next) => {
  res.render('index', {title: 'Home', pageh1: 'Contact Application'})
})

app.get('/randomize', (req, res, next) => {
  Contact.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    company: faker.company.companyName(),
    number: faker.phone.phoneNumberFormat().split('-').join(''),
    email: faker.internet.email(),
  })
  .then(() => res.redirect('/contacts'))
  .catch(next)
})

app.use((err, req, res, next) => {
  console.log(err)
  if (err.name === 'SequelizeValidationError') {
    res.render('error', {error: err, pageh1: 'Error', title: 'Error'})
    .catch(next)
  }
  else res.sendStatus(404)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))

db.sync()
  .then(() => db.seed());
