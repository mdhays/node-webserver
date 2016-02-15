'use strict';

const express = require('express');
const router = express.Router();

const api = require('./api');
const contact = require('./contact');
const hello = require('./hello');
const home = require('./');
const sendphotos = require('./sendphotos');

router.use(api);
router.use(contact);
router.use(hello);
router.use(sendphotos);

module.exports = router;
