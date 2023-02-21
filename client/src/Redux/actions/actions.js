import {
    SAVE_ALL_COUNTRIES,
    GET_COUNTRY_BY_NAME,
    FILTER_COUNTRIES_BY_CONTINENT,
    POST_ACTIVITY,
    SHOW_ALL,
    RESET_STATE,
    CHANGE_MESSAGE,
    FILTER_COUNTRIES_BY_ACTIVITY
} from './actionTypes';
import axios from 'axios';

export const saveCountries = () => {
    return async function (dispatch) {
        try {
            let response = await axios('http://localhost:3001/countries/countriesActs');
            dispatch({
                type: SAVE_ALL_COUNTRIES,
                payload: response.data
            })
        } catch (error) {
            console.log(error.mesage)
        }
    }
}

export const getCountryByName = (name) => {
    return async function (dispatch) {
        try {
            let response = await axios(`http://localhost:3001/countries?name=${name}`)
            dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const postActivity = (activity) => {
    return async function (dispatch) {
        try {
            let response = await axios.post('http://localhost:3001/activities', activity)
            dispatch({
                type: POST_ACTIVITY,
                payload: response.data
            })
        } catch (error) {
            console.log(error.mesage)
        }
    }
}

export const filterCountriesByContinent = (obj) => {
    return {
        type: FILTER_COUNTRIES_BY_CONTINENT,
        payload: obj
    }
}

export const filterCountriesByActivity = (campo, valor) => {
    return {
        type: FILTER_COUNTRIES_BY_ACTIVITY,
        payload: {campo, valor}
    }
}

export const showAll = (order) => {
    return {
        type: SHOW_ALL,
        payload: order
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}

export const changeMessage = (message) => {
    return {
        type: CHANGE_MESSAGE,
        payload: message
    }
}