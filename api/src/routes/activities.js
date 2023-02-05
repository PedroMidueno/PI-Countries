const express = require('express');
const router = express.Router();
const { postActivity } = require('../controllers')

router.post('/', postActivity);


module.exports = router;
