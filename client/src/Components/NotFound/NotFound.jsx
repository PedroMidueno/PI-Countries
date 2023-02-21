import React from 'react'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.divNotFound}>
      <div className={styles.divTarjeta}>
        <div>
          <img src="404.png" alt="404 Not Found" />
        </div>
        <h1>Not Found</h1>
      </div>

      <div className={styles.divMensaje}>
        <h1>La página que intentas buscar no existe.</h1>
      </div>
    </div>
  )
}



