const express = require('express');
const {generateNewShortURL,getAnalysis} = require('../controller/url')
const router = express.Router();


router.post('/',generateNewShortURL);
router.get('/analytics/:shortId', getAnalysis);

module.exports = router