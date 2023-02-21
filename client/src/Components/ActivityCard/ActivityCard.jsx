import React from 'react';
import styles from './ActivityCard.module.css'

export default function ActivityCard(props) {

  const { nombre, duracion, dificultad, temporada } = props;

  const dificultyName = (val) =>{
    if(val === 1) return 'Familiar';
    if(val === 2) return 'Fácil';
    if(val === 3) return 'Medio';
    if(val === 4) return 'Difícil';
    if(val === 5) return 'Extremo';

    return 'No info';
  }
  

  return (
    <div className={styles.divCard}>
      <h2>{nombre}</h2>
      <h3>Duración:</h3>
      <h4>{duracion}</h4>
      <h3>Dificultad</h3>
      <h4>{dificultyName(dificultad)}</h4>
      <h3>Temporada</h3>
      <h4>{temporada}</h4>
    </div>
  )
}
