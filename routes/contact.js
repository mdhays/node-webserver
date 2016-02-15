'use strict';

const express = require('express');
const router = express.Router();

const Contact = require('../models/contact');

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.post('/', (req, res) => {
  const obj = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  obj.save((err, newObj) => {
    if (err) throw err;

    res.send(`<h1>Thanks for contacting us ${newObj.name}</h1>`);
  });
});

module.exports = router;