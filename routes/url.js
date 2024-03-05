const express = require('express');
const generateNewShortURL = require('../controller/url')
const router = express.Router();


router.post('/',generateNewShortURL)


module.exports = router