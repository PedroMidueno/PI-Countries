import React, { useState, useEffect } from "react";
import styles from './Cards.module.css';
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import {
    filterCountriesByContinent,
    changeMessage,
    showAll,
    saveCountries,
    filterCountriesByActivity
} from '../../Redux/actions/actions';
import { useLocation, useNavigate } from "react-router-dom";
//-----------------------------------------------------------------------------------------------------------------------
export default function Cards() {
    // Elementos para modificar el estado global de redux
    const dispatch = useDispatch();
    const { filteredCountries, message } = useSelector((state) => {
        return state;
    })
    //-----------------------------------------------------------------------------------------------------------------------
    const [countries, setCountries] = useState([]);
    const [order, setOrder] = useState("desordenado");
    const [countriesToShow, setCountriesToShow] = useState([])
    //-----------------------------------------------------------------------------------------------------------------------
    // Elementos necesarios para paginado
    let { search } = useLocation();
    let navigate = useNavigate();
    const LIMIT = 10;
    let query = new URLSearchParams(search);
    let start = parseInt(query.get('inicio')) || 1;
    // let end = parseInt(query.get('fin')) || LIMIT;
    let end = countries.length < 10 ? countries.length : parseInt(query.get('fin')) || LIMIT

    //-----------------------------------------------------------------------------------------------------------------------

    const saveCountriesToState = () => {
        dispatch(saveCountries());
    }
    //-----------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        if (countries.length === 0) {
            return saveCountriesToState();
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setCountries([...filteredCountries]);
    }, [filteredCountries])

    useEffect(() => {
        let copy = [...countries];
        let result = copy.slice(start - 1, end);
        setCountriesToShow([...result])
    }, [start, end, countries])

    //-----------------------------------------------------------------------------------------------------------------------
    const filtrarPorContinente = (event) => {
        const continent = event.target.value
        let obj = {
            orden: order,
            continent: continent
        }
        dispatch(filterCountriesByContinent(obj));
        navigate(`?inicio=1&fin=10`);
    }
    //-----------------------------------------------------------------------------------------------------------------------
    const mostrarTodos = () => {
        dispatch(showAll(order));
        navigate(`?inicio=1&fin=10`);
    }
    //-----------------------------------------------------------------------------------------------------------------------
    const ordenarPaises = (event) => { //Ordenar alfabéticamente
        let orden = event.target.value;
        if (orden === "ascendente") {
            let copy = [...countries];
            copy.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            setCountries([...copy]);
            setOrder("ascendente");
            return;
        }

        if (orden === "descendente") {
            let copy = [...countries];
            copy.sort(function (a, b) {
                return b.name.localeCompare(a.name);
            });
            setCountries([...copy]);
            setOrder("descendente");
            return;
        }

        if (orden === "desordenado") {
            setCountries([...filteredCountries]);
            setOrder("desordenado")
            return;
        }
    }
    //-----------------------------------------------------------------------------------------------------------------------

    const ordenarPaisesPorPoblacion = (event) => {
        let orden = event.target.value;
        if (orden === "ascendente") {
            let copy = [...countries];
            copy.sort((a, b) => a.population - b.population);
            setCountries([...copy]);
            setOrder("ascendente");
            return;
        }

        if (orden === "descendente") {
            let copy = [...countries];
            copy.sort((a, b) => b.population - a.population);
            setCountries([...copy]);
            setOrder("descendente");
            return;
        }

        if (orden === "desordenado") {
            setCountries([...filteredCountries]);
            setOrder("desordenado")
            return;
        }
    }

    //-----------------------------------------------------------------------------------------------------------------------
    const filtrarPorActividad = (event) => {
        dispatch(changeMessage('No se encontraron coincidencias...'))
        let props = event.target.value;
        props = props.split('.')
        let campo = props[0]
        let valor = props[1]
        dispatch(filterCountriesByActivity(campo, valor))

    }

    //-----------------------------------------------------------------------------------------------------------------------
    const handleNext = () => {
        if (end + 10 > countries.length) {
            navigate(`?inicio=${start + LIMIT}&fin=${countries.length}`)
            return
        }
        navigate(`?inicio=${start + LIMIT}&fin=${end + LIMIT}`)
    }
    //-----------------------------------------------------------------------------------------------------------------------
    const handlePrev = () => {
        if (end === countries.length && end % 10 !== 0) {
            navigate(`?inicio=${start - LIMIT}&fin=${end - end % LIMIT}`)
            return;
        }
        navigate(`?inicio=${start - LIMIT}&fin=${end - LIMIT}`)
    }
    //-----------------------------------------------------------------------------------------------------------------------
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    //-----------------------------------------------------------------------------------------------------------------------

    const prev = "< Anterior";
    const next = "Siguiente >";

    const showFilters=()=>{
        const filters = document.getElementById('divSelectors')

        filters.classList.toggle(styles.visible)
    }

    // console.log(order)
    return (
        <div className={styles.divGeneral}>

            <button className={styles.botonMostrarFiltros} onClick={showFilters}>Mostrar/ocultar filtros</button>

            <div className={styles.divSelectors} id="divSelectors">
                <div>
                    <h5>Filtrar por <br /> continente:</h5>
                    <select name="continent">
                        <option value='default' onClick={mostrarTodos}>Mostrar todos</option>
                        <option value="Antarctica" onClick={filtrarPorContinente}>Antártica</option>
                        <option value="Africa" onClick={filtrarPorContinente}>África</option>
                        <option value="Asia" onClick={filtrarPorContinente}>Asia</option>
                        <option value="Europe" onClick={filtrarPorContinente}>Europa</option>
                        <option value="North America" onClick={filtrarPorContinente}>Norteamérica</option>
                        <option value="South America" onClick={filtrarPorContinente}>Sudamérica</option>
                        <option value="Oceania" onClick={filtrarPorContinente}>Oceanía</option>
                    </select>
                </div>

                <div>
                    <h5>Filtrar por dificultad <br /> de actividades:</h5>
                    <select name="dificultad">
                        <option value="default" onClick={mostrarTodos}>Mostrar todos</option>
                        <option value='dificultad.1' onClick={filtrarPorActividad}>Familiar</option>
                        <option value='dificultad.2' onClick={filtrarPorActividad}>Fácil</option>
                        <option value='dificultad.3' onClick={filtrarPorActividad}>Medio</option>
                        <option value='dificultad.4' onClick={filtrarPorActividad}>Difícil</option>
                        <option value='dificultad.5' onClick={filtrarPorActividad}>Extremo</option>
                    </select>
                </div>

                <div>
                    <h5>Filtrar por temporada <br /> de actividades:</h5>
                    <select name="temporada" >
                        <option value="default" onClick={mostrarTodos}>Mostrar todos</option>
                        <option value='temporada.Invierno' onClick={filtrarPorActividad}>Invierno</option>
                        <option value='temporada.Verano' onClick={filtrarPorActividad}>Verano</option>
                        <option value='temporada.Otoño' onClick={filtrarPorActividad}>Otoño</option>
                        <option value='temporada.Primavera' onClick={filtrarPorActividad}>Primavera</option>
                    </select>
                </div>

                <div>
                    <h5>Ordenar por <br /> orden alfabético:</h5>
                    <select name="ordenar" >
                        <option value="desordenado" onClick={ordenarPaises}>Seleccione</option>
                        <option value="ascendente" onClick={ordenarPaises}>A - Z</option>
                        <option value="descendente" onClick={ordenarPaises}>Z - A</option>
                    </select>
                </div>

                <div>
                    <h5>Ordenar por cantidad <br /> de habitantes:</h5>
                    <select name="ordenar" >
                        <option value="desordenado" onClick={ordenarPaisesPorPoblacion}>Seleccione</option>
                        <option value="ascendente" onClick={ordenarPaisesPorPoblacion}>Ascendente</option>
                        <option value="descendente" onClick={ordenarPaisesPorPoblacion}>Descendente</option>
                    </select>
                </div>
            </div>

            {countries.length > 0 ?
                <div className={styles.divCountries}>
                    {countriesToShow.map((elem, index) => {
                        return (
                            <Card
                                key={index}
                                id={elem.id}
                                name={elem.name}
                                code={elem.id}
                                flagImage={elem.flagImage}
                                continent={elem.continent}
                            />
                        )
                    })}
                </div> :
                <div className={styles.divLoading}>
                    <h1 id='loadingText'>{message}</h1>
                </div>
            }

            <div className={styles.divPaginas}>
                <h3>Mostrando paises del <b>{start}</b> al <b>{end}</b> de <b>{countries.length}</b></h3>
                {start > 1 && <button onClick={() => {
                    handlePrev();
                    scrollTop();
                }}>{prev}</button>}
                {end < countries.length && <button onClick={() => {
                    handleNext();
                    scrollTop();
                }}>{next}</button>}
            </div>


        </div>
    )
}