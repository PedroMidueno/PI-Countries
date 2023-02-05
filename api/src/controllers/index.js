const axios = require('axios');
const { Activity, Country } = require('../db')

const getCountries = async (req, res) => {


    const { name } = req.query;

    if (name) {
        try {            
            const { name } = req.query;
            const response = await axios(`https://restcountries.com/v3/name/${name}`)
            const countries = response.data;

            if (response.status === 200) {
                return res.status(200).send(countries)
            }

        } catch (error) {
            return res.status(404).send(`Error: "${error.message}", no hay paises con el nombre proporcionado.`)
        }

    }

    try {        
        const response = await axios('https://restcountries.com/v3/all');
        const countries = response.data;

        countries.forEach(async (country) => {
            const { cca3, name, flags, continents, capital, subregion, area, population } = country;

            const obj = {
                id: cca3,
                name: name.common,
                flagImage: flags[1],
                continent: continents[0],
                capital: capital !== undefined ? capital[0] : 'No info',
                subregion: subregion,
                area: area,
                population: population
            }

            await Country.create({ ...obj })
        });

        res.status(201).send('Información guardada en la base de datos')
    } catch (error) {
        res.status(500).send(error.message)
    }




}

const getCountryById = async (req, res) => { //GET https://restcountries.com/v3/alpha/{code}

    try {
        const { idPais } = req.params;

        const response = await axios(`https://restcountries.com/v3/alpha/${idPais}`);
        const country = response.data;

        res.status(201).send(country)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getCountryAct = async (req, res) => {
    try {
        const { code } = req.params;

        const countryActs = await Country.findAll({
            where: {
                id: code
            },
            include: {
                model: Activity,
                through: {
                    attributes: []
                }
            }

        })

        res.status(200).send(countryActs)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const postActivity = async (req, res) => { 
    try {
        const { nombre, duracion, dificultad, temporada, countriesCodes } = req.body

        const activity = await Activity.create({
            nombre, duracion, dificultad, temporada
        })

        await activity.addCountries(countriesCodes)

        res.status(201).send(activity)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { getCountries, getCountryById, postActivity, getCountryAct }