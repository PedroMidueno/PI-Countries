import {
    SAVE_ALL_COUNTRIES,
    GET_COUNTRY_BY_NAME,
    FILTER_COUNTRIES_BY_CONTINENT,
    POST_ACTIVITY,
    SHOW_ALL,
    RESET_STATE,
    CHANGE_MESSAGE,
    FILTER_COUNTRIES_BY_ACTIVITY
} from '../actions/actionTypes';

const initialState = {
    allCountries: [], //para guardar todos los countries
    filteredCountries: [], //aqui se guardan las cards que se mostraran
    backFiltered: [], //el backup de filteredCountries
    searchedCountries: [],// las countries que se mostraran en la busqueda en el Form
    message: 'Cargando paises...'
}

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SAVE_ALL_COUNTRIES: {
            return {
                ...state,
                allCountries: [...payload],
                filteredCountries: [...payload],
                backFiltered: [...payload]
            }
        }

        case GET_COUNTRY_BY_NAME: {
            return {
                ...state,
                filteredCountries: [...payload]
            }
        }

        case FILTER_COUNTRIES_BY_CONTINENT: {
            const { orden, continent } = payload;
            let copy = [...state.allCountries]

            let filterArr = copy.filter((elem) => {
                return elem.continent === continent;
            })

            if (orden === "ascendente") {
                filterArr.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
            }

            if (orden === "descendente") {
                filterArr.sort(function (a, b) {
                    return b.name.localeCompare(a.name);
                });
            }

            return {
                ...state,
                filteredCountries: [...filterArr],
                backFiltered: [...filterArr]
            }
        }

        case FILTER_COUNTRIES_BY_ACTIVITY: {
            const { campo, valor } = payload;

            var result;
            let copy = [...state.allCountries]
            if (campo === 'dificultad') {
                result = copy.filter((elem) => {
                    let add = elem.activities.findIndex(act => act.dificultad === Number(valor));
                    if (add >= 0) {
                        return true;
                    }
                    return false;
                });
            } else if (campo === 'temporada') {
                result = copy.filter((elem) => {
                    let add = elem.activities.findIndex(act => act.temporada === valor);
                    if (add >= 0) {
                        return true;
                    }
                    return false;
                });
            }
            return {
                ...state,
                filteredCountries: [...result],
                backFiltered: [...result]
            }
        }

        case SHOW_ALL: {
            let copy = [...state.allCountries];

            if (payload === "ascendente") {
                copy.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
            }

            if (payload === "descendente") {
                copy.sort(function (a, b) {
                    return b.name.localeCompare(a.name);
                });
            }

            return {
                ...state,
                filteredCountries: [...copy],
                backFiltered: [...copy]
            }
        }

        case RESET_STATE: {
            return {
                ...state,
                filteredCountries: [...state.backFiltered]
            }
        }

        case CHANGE_MESSAGE: {
            return {
                ...state,
                message: payload
            }
        }

        case POST_ACTIVITY: {
            return;
        }

        default:
            return state;
    }
}

export default reducer;