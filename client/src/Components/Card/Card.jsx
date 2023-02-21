import React from "react";
import styles from './Card.module.css';
import { Link } from 'react-router-dom'

export default function Card(props) {
    const { id, flagImage, name, continent } = props;

    return (
        <Link to={`/detail/${id}`}>
            <div className={styles.divCard} title='Ver detalle del país'>
                <div className={styles.divFlag}>
                    <img src={flagImage} alt={`Bandera de ${name}`} />
                </div>

                <div className={styles.divName}>
                    <h2>{name}</h2>
                </div>

                <div className={styles.divId}>
                    <h2>({id})</h2>
                </div>

                <div className={styles.divContinent}>
                    <h2>{continent}</h2>
                </div>
            </div>
        </Link>
    )
}