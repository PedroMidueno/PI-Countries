const express = require('express');
const router = express.Router();
const {getCountries, getCountryById, getCountryAct, saveCountriesToDB, getAllCountryAct} = require('../controllers')

router.get('/', getCountries);
router.get('/save', saveCountriesToDB)
router.get('/countriesActs', getAllCountryAct)
router.get('/:idPais', getCountryById);
router.get('/activities/:code', getCountryAct)



module.exports = router;