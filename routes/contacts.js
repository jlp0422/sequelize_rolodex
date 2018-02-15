/* eslint-disable */

const app = require('express').Router();
const db = require('../db');
const { Contact } = db.models;

module.exports = app;

app.get('/', (req, res, next) => {
  Contact.findAll()
    .then( contacts => res.render('contacts', {title: 'Contacts', pageh1: 'Contacts', contacts}))
    .catch( err => next(err))
});

app.get('/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => res.render('contact', { title: `${contact.fullName}`, pageh1: `Contact Information`, contact}))
    .catch(next)
});

app.post('/', (req, res, next) => {
  Contact.create(req.body)
  .then( () => res.redirect('/contacts'))
  .catch(next)
})

app.delete('/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => contact.destroy())
    .then(() => res.redirect('/contacts'))
    .catch(next)
})

app.get('/:id/edit', (req, res, next) => {
  Contact.findById(req.params.id)
    .then( contact => res.render('edit', { title: `${contact.firstName} ${contact.lastName}`, pageh1: `Edit Information`, contact}))
    .catch(next)
})

app.patch('/:id/edit', (req, res, next) => {
  Contact.findById(req.params.id)
    .then( contact => {
    if (req.body.firstName) contact.firstName = req.body.firstName
    if (req.body.lastName) contact.lastName = req.body.lastName
    if (req.body.company) contact.company = req.body.company
    if (req.body.number) contact.number = req.body.number
    if (req.body.email) contact.email = req.body.email
    return contact.save()
    })
    .then( () => res.redirect(`/contacts/${req.params.id}`))
    .catch(next)
})
