import React, { useState, useEffect } from "react";
import styles from './Detail.module.css';
import { useParams } from 'react-router-dom';
import axios from "axios";
import ActivityCard from '../ActivityCard/ActivityCard'

export default function Detail(props) {

    const { idPais } = useParams();

    const [country, setCountry] = useState({})

    useEffect(() => {
        axios(`http://localhost:3001/countries/activities/${idPais}`)
            .then(response => response.data)
            .then((data) => {
                if (data.length) {
                    setCountry(data[0])
                }

            })
            .catch((e) => {
                window.alert(e)
            })
    }, [idPais])

    const formatArea = (num) => {
        if (!num) {
            return 'No info';
        }

        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        let arr = num.toString().split('.');
        arr[0] = arr[0].replace(exp, rep);
        return arr[1] ? arr.join('.') : arr[0];
    }
    
        return (
            <>
                {!country.name ?
                    <div className={styles.divLetrero}>
                        <h1>
                            {`No se encontro un país con el id "${idPais}"`}
                        </h1>
                    </div> :
                    <div className={styles.divGral}>
                        {/*Contenedor de la tarjeta*/}
                        <div className={styles.divDetail}>
                            <div className={styles.divTop}>
                                <div className={styles.divNombre}>
                                    <h1>{country.name}</h1>
                                </div>
                                <div className={styles.divCodigo}>
                                    <h2>{`(${country.id})`}</h2>
                                </div>
                            </div>
                            <hr />
                            <div className={styles.divBottom}>
                                <div className={styles.divImg}>
                                    <img src={country.flagImage} alt={`Bandera de ${country.name}`} />
                                </div>
                                <div className={styles.divInfo}>
                                    <div className={styles.divCapital}>
                                        <h1>Capital: <i>{country.capital}</i></h1>
                                    </div>
                                    <div className={styles.divSubregion}>
                                        <h1>Subregion: <i>{country.subregion || 'No info'}</i></h1>
                                    </div>
                                    <div className={styles.divArea}>
                                        <h1>Área: <i>{formatArea(country.area)} km<sup>2</sup></i></h1>
                                    </div>
                                    <div className={styles.divPoblacion}>
                                        <h1>Población: <i>{formatArea(country.population)} personas</i></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Contenedor de las actividades */}
                        <div className={styles.divActivities}>
                            {/* <div className={styles.divNombre}> */}
                            <h1>{`Actividades turísticas en ${country.name}`}</h1>
                            <div className={styles.divActCards}>
                                {country.activities?.length > 0 ?
                                    country.activities.map((elem) => {
                                        return (
                                            <ActivityCard
                                                key={elem.id}
                                                nombre={elem.nombre}
                                                dificultad={elem.dificultad}
                                                duracion={elem.duracion}
                                                temporada={elem.temporada}
                                            />
                                        )
                                    }) :
                                    <div className={styles.divNoActs}>
                                        <h2>No hay actividades registradas en este país.</h2>
                                    </div>
                                }
                            </div>
                            {/* </div> */}
                        </div>
                    </div>}
            </>
        )

}