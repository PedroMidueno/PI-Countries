import React, { useState, useEffect } from "react";
import styles from './Form.module.css';
import axios from 'axios';

export default function Form(props) {

    const [inputs, setInputs] = useState({
        nombre: '',
        duracion: '1 hora',
        dificultad: 1,
        temporada: 'Invierno'
    })
    const [countries, setCountries] = useState([])
    const [searched, setSearched] = useState([])
    const [name, setName] = useState('')
    // eslint-disable-next-line 
    const regexNombre = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;

    useEffect(() => {
        axios('http://localhost:3001/countries')
            .then(res => res.data)
            .then(data => {
                setSearched([...data])
            })
            .catch(err => window.alert(err.message))
    }, [])

    const cambiarNombre = (e) => {
        setInputs({
            ...inputs,
            nombre: e.target.value
        })
    }

    const cambiarDuracion = (e) => {
        const numberSelect = document.getElementById('number')
        const durationSelect = document.getElementById('duration')

        const number = numberSelect.value
        const duration = durationSelect.value

        if (number === '1') {
            let duration1 = duration.substring(0, duration.length - 1)
            setInputs({
                ...inputs,
                duracion: `${number} ${duration1}`
            })
            return;
        }

        setInputs({
            ...inputs,
            duracion: `${number} ${duration}`
        })
    }

    const cambiarDificultad = (e) => {
        setInputs({
            ...inputs,
            dificultad: Number(e.target.value)
        })
    }

    const cambiarTemporada = (e) => {
        setInputs({
            ...inputs,
            temporada: e.target.value
        })
    }

    const agregarPais = (e) => {
        let existe = countries.find(elem => elem.id === e.target.attributes[0].value)

        if (!existe) {
            let copy = [...countries]
            let name = e.target.innerText
            let id = e.target.attributes[0].value
            copy.push({ name, id })
            setCountries(copy)
        }

        return;
    }

    const quitarPais = (e) => {
        let result = countries.filter(elem => elem.id !== e.target.attributes[0].value)
        setCountries(result)
    }

    const changeName = (e) => {
        setName(e.target.value)
    }

    const searchCountries = async (e) => {
        let name = e.target.value;

        if (name.length > 0) {
            try {
                let res = await axios(`http://localhost:3001/countries?name=${name}`);
                let countries = res.data;
                setSearched([...countries])
                return;
            } catch (error) {
                window.alert(error.message)
                return;
            }
        } else {
            try {
                let res = await axios('http://localhost:3001/countries')
                let countries = res.data;
                setSearched([...countries])
                return;
            } catch (error) {
                window.alert(error.message)
                return;
            }
        }
    }

    const clear = () => {
        setInputs({
            ...inputs,
            nombre: ''
        })
        setCountries([])
    }

    const enviarInfo = async (inputs) => {
        if (inputs.nombre.length === 0) {
            window.alert('Error: Faltan campos por llenar.')
            return;
        }

        if (regexNombre.test(inputs.nombre)) {
            window.alert('Error: El nombre no puede incluir caracteres especiales.')
            return;
        }

        if (countries.length === 0) {
            window.alert('Error: No ha seleccionado ningun país.')
            return;
        }

        var load = document.getElementById('loading')
        load.classList.remove(styles.invisible)

        try {
            let codes = countries.map(elem => elem.id)
            let info = {
                ...inputs,
                countriesCodes: [...codes]
            }

            let res = await axios.post('http://localhost:3001/activities', info)
            clear();
            load.classList.add(styles.invisible)
            setTimeout(() => {                
                window.alert(res.data)
            }, 500);            
        } catch (error) {
            window.alert(`Error: ${error.message}`)
        }

    }


    return (
        <div className={styles.divGral}>
            <div className={styles.divTitulo}>
                <h1>Crear actividades turísticas</h1>
            </div>

            <div className={styles.divInfo}>
                <div className={styles.divForm}>
                    <h2>Introduzca la información</h2>
                    <h3>Nombre de la actividad: </h3>
                    <input type="text" name="nombre" placeholder="Introduzca un nombre" value={inputs.nombre} id='inputNombre'
                        onChange={cambiarNombre} maxLength='40' />
                    <h3>Duración de la actividad :</h3>
                    <div className={styles.divDuracion}>
                        <select name="numberSelect" id="number">
                            <option value="1" onClick={cambiarDuracion}>1</option>
                            <option value="2" onClick={cambiarDuracion}>2</option>
                            <option value="3" onClick={cambiarDuracion}>3</option>
                            <option value="4" onClick={cambiarDuracion}>4</option>
                            <option value="5" onClick={cambiarDuracion}>5</option>
                            <option value="6" onClick={cambiarDuracion}>6</option>
                            <option value="7" onClick={cambiarDuracion}>7</option>
                            <option value="8" onClick={cambiarDuracion}>8</option>
                        </select>
                        <select name="durationSelect" id='duration'>
                            <option value="horas" onClick={cambiarDuracion}>hora(s)</option>
                            <option value="dias" onClick={cambiarDuracion}>día(s)</option>
                            <option value="semanas" onClick={cambiarDuracion}>semana(s)</option>
                        </select>
                    </div>
                    <div className={styles.divDifTemp}>
                        <div className={styles.divDif}>
                            <h3>Dificultad:</h3>
                            <select name="dificultadSelect">
                                <option value="1" onClick={cambiarDificultad}>Familiar</option>
                                <option value="2" onClick={cambiarDificultad}>Fácil</option>
                                <option value="3" onClick={cambiarDificultad}>Medio</option>
                                <option value="4" onClick={cambiarDificultad}>Difícil</option>
                                <option value="5" onClick={cambiarDificultad}>Extremo</option>
                            </select>
                        </div>
                        <div className={styles.divTemp}>
                            <h3>Temporada:</h3>
                            <select name="seasonSelect">
                                <option value="Invierno" onClick={cambiarTemporada}>Invierno</option>
                                <option value="Primavera" onClick={cambiarTemporada}>Primavera</option>
                                <option value="Verano" onClick={cambiarTemporada}>Verano</option>
                                <option value="Otoño" onClick={cambiarTemporada}>Otoño</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.divSubmit}>
                        <button onClick={() => {
                            enviarInfo(inputs)
                        }} className={styles.botonCrear}>Crear actividad</button>
                        <div id='loading' className={styles.invisible}></div>
                    </div>
                </div>

                <div className={styles.divCountries}>
                    <h3>Países en donde se <br />creará la actividad:</h3>
                    <h5>(Haga click para eliminar)</h5>
                    <div className={styles.divCountriesAdded}>
                        {countries.length > 0 ?
                            countries.map((elem, index) => {
                                return (
                                    <div key={index} name={elem.id} onClick={quitarPais}
                                        className={styles.divCountryAdded} title={`Eliminar a ${elem.name} de la lista`}
                                    >{elem.name}</div>
                                )
                            }) :
                            <div className={styles.divNoCountries}>Debe agregar <br /> al menos un pais...</div>
                        }
                    </div>
                </div>

                <div className={styles.divSearch}>
                    <h3>Seleccione los países donde <br /> agregará la actividad:</h3>
                    <input type="text" name="buscar" placeholder="Buscar país" value={name} onChange={(e) => {
                        changeName(e)
                        searchCountries(e);
                    }} />
                    <h5>(Haga click para agregar)</h5>
                    <div className={styles.divSearchList}>
                        {searched.length > 0 ?
                            searched.map((elem) => {
                                return (
                                    <div key={elem.id} name={elem.id} onClick={agregarPais}
                                        className={styles.divSearchCountry} title={`Agregar ${elem.name} a la lista`}>{elem.name}</div>
                                )
                            }) :
                            <div className={styles.divNoRes}>Sin resultados...</div>
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}