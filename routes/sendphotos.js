'use strict';

const express = require('express');
const router = express.Router();

const upload = require('multer')({ dest: 'tmp/uploads' });

const sendphoto = require('../controller/sendphoto');

router.get('/sendphoto', sendphoto.index);
router.post('/sendphoto', upload.single('image'), sendphoto.new);

module.exports = router;
