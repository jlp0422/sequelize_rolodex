/* eslint-disable */

const app = require('express').Router();
const db = require('../db');
const Contact = db.models.Contact;

module.exports = app;

app.get('/', (req, res, next) => {
  Contact.findAll()
    .then( contacts => res.render('contacts', {title: 'Contacts', pageh1: 'Contacts', contacts}))
    .catch( err => next(err))
});

app.get('/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => res.render('contact', { title: `${contact.firstName} ${contact.lastName}`, pageh1: `Contact Information`, contact}))
    .catch(err => next(err))
});

app.post('/', (req, res, next) => {
  Contact.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    company: req.body.company,
    number: req.body.number,
    email: req.body.email
  })
  .then( () => res.redirect('/contacts'))
  .catch( err => next(err))
})

app.delete('/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => contact.destroy())
    .then(() => res.redirect('/contacts'))
    .catch(err => next(err))
})

app.get('/:id/edit', (req, res, next) => {
  Contact.findById(req.params.id)
    .then( contact => res.render('edit', { title: `${contact.firstName} ${contact.lastName}`, pageh1: `Edit Information`, contact}))
    .catch( err => next(err));
})

app.patch('/:id/edit', (req, res, next) => {
  Contact.findById(req.params.id)
    .then( contact => {
    if (req.body.firstName) contact.firstName = req.body.firstName
    if (req.body.lastName) contact.lastName = req.body.lastName
    if (req.body.company) contact.company = req.body.company
    if (req.body.number) contact.number = req.body.number
    return contact.save()
    })
    .then( () => res.redirect(`/contacts/${req.params.id}`))
    .catch( err => next(err))
})
