const express = require('express');
const router = express.Router();
const {getCountries, getCountryById, getCountryAct} = require('../controllers')

router.get('/', getCountries);
router.get('/:idPais', getCountryById);
router.get('/activities/:code', getCountryAct)


module.exports = router;