const axios = require('axios');
const { Activity, Country } = require('../db');
const { Op } = require('sequelize')

const saveCountriesToDB = async (req, res) => {

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

            let exists = await Country.findByPk(cca3)

            if (!exists) {
                await Country.create({ ...obj })
            }


        });

        res.status(201).send('Información guardada en la base de datos')
    } catch (error) {
        res.status(500).send(`Error: "${error.message}"`)
    }
}



const getCountries = async (req, res) => {

    const { name } = req.query;
    // En caso de que se pase name por query
    if (name) {
        try {
            // console.log('En name');
            console.log(name, typeof name)
            let response = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: "%" + name + "%"
                    }
                }
            })

            if (response.length) {
                return res.status(200).send(response)
            } else {
                return res.status(200).send([])
            }

        } catch (error) {
            return res.status(404).send(`Error: "${error.message}"`)
        }

    }

    // En caso de que se acceda a la ruta sin queries
    try {
        // console.log('En all');
        const allCountries = await Country.findAll();
        res.status(200).send(allCountries)
    } catch (error) {
        res.status(404).send(error.message)
    }

}

const getAllCountryAct = async (req, res) => {
    try {
        const countryActs = await Country.findAll({
            include: {
                model: Activity,
                through: {
                    attributes: []
                }
            }
        })

        res.status(200).send(countryActs)
    } catch (error) {
        res.status(500).send(`Error: "${error.message}"`)
    }
}

const getCountryById = async (req, res) => {

    try {
        const { idPais } = req.params;
        let mayusId = idPais.toUpperCase()
        let response = await Country.findByPk(mayusId)

        if (response) {
            res.status(201).send(response)
        } else {
            res.status(404).send('No se encontro un pais con el id proporcionado')
        }
    } catch (error) {
        res.status(500).send(`Error: "${error.message}"`)
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
        res.status(500).send(`Error: "${error.message}"`)
    }
}



const postActivity = async (req, res) => {
    try {
        const { nombre, duracion, dificultad, temporada, countriesCodes } = req.body

        const activity = await Activity.create({
            nombre, duracion, dificultad, temporada
        })

        await activity.addCountries(countriesCodes)

        res.status(201).send('Actividad creada con éxito')
    } catch (error) {
        res.status(500).send(`Error: "${error.message}"`)
    }
}

module.exports = {
    getCountries,
    getCountryById,
    postActivity,
    getCountryAct,
    saveCountriesToDB,
    getAllCountryAct
}