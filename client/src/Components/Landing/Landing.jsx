import React, { useEffect } from "react";
import styles from './Landing.module.css';
import axios from 'axios';

export default function Landing(props) { 

    useEffect(() => {
        axios('countries/save')
            .then(response => response.data)
            .then(data => console.log(data))
            .catch(error => console.log(error.message))
    }, [])    

    function presionar_enter(event) {
        let tecla = event.keyCode

        if (tecla === 13) {
            document.getElementById('boton').click()
        }
    }

    window.onkeydown = presionar_enter;

    return (
        <div className={styles.divLanding}>
            {/* Slider con Banderas del 1 al 10*/}
            <div className={`${styles.slider} ${styles.first_slider}`}>
                <div className={styles.slideTrack}>
                    <div className={styles.slide}>
                       <img src="animationImgs/1.png" alt="Bandera 1" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/2.png" alt="Bandera 2" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/3.png" alt="Bandera 3" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/4.png" alt="Bandera 4" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/5.png" alt="Bandera 5" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/6.png" alt="Bandera 6" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/7.png" alt="Bandera 7" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/8.png" alt="Bandera 8" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/9.png" alt="Bandera 9" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/10.png" alt="Bandera 10" /> 
                    </div>

                    <div className={styles.slide}>
                       <img src="animationImgs/1.png" alt="Bandera 1" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/2.png" alt="Bandera 2" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/3.png" alt="Bandera 3" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/4.png" alt="Bandera 4" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/5.png" alt="Bandera 5" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/6.png" alt="Bandera 6" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/7.png" alt="Bandera 7" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/8.png" alt="Bandera 8" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/9.png" alt="Bandera 9" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/10.png" alt="Bandera 10" /> 
                    </div>
                </div>
            </div>
            {/* Aquí termina el primer slider*/}

            <div className={styles.divLogo}>
                <div>
                    <img src="logoApp.png" alt="Imagen de Portada" />
                </div>
                <h1>PI Countries</h1>
            </div>            
            
            <div className={styles.divButton}>
                <button onClick={() => {
                    props.goToHome();
                }}
                id='boton'
                className={styles.botonIngresar}>Ingresar a la App</button>
            </div>

            {/* Slider con Banderas del 11 al 20*/}
            <div className={`${styles.slider} ${styles.second_slider}`}>
                <div className={styles.slideTrack}>
                    <div className={styles.slide}>
                       <img src="animationImgs/11.png" alt="Bandera 11" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/12.png" alt="Bandera 12" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/13.png" alt="Bandera 13" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/14.png" alt="Bandera 14" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/15.png" alt="Bandera 15" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/16.png" alt="Bandera 16" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/17.png" alt="Bandera 17" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/18.png" alt="Bandera 18" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/19.png" alt="Bandera 19" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/20.png" alt="Bandera 20" /> 
                    </div>

                    <div className={styles.slide}>
                       <img src="animationImgs/11.png" alt="Bandera 11" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/12.png" alt="Bandera 12" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/13.png" alt="Bandera 13" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/14.png" alt="Bandera 14" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/15.png" alt="Bandera 15" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/16.png" alt="Bandera 16" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/17.png" alt="Bandera 17" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/18.png" alt="Bandera 18" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/19.png" alt="Bandera 19" /> 
                    </div>
                    <div className={styles.slide}>
                       <img src="animationImgs/20.png" alt="Bandera 20" /> 
                    </div>
                </div>
            </div>
            {/* Aquí termina el segundo slider*/}
        </div>
    )
}