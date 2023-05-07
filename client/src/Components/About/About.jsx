import React from "react";
import styles from './About.module.css';

export default function About(props) {


    return (
        <div className={styles.divGral}>
            <div className={styles.divHeader}>
                <div className={styles.divLogo}>
                    <img src="logoApp.png" alt="Logo PI Countries" />
                </div>
                <div className={styles.divTitulo}>
                    <h1>PI Countries</h1>
                </div>
            </div>

            <div className={styles.divContent}>
                <p>
                    Esta App fue desarrollada como proyecto individual dentro del Bootcamp de Desarrollo Web
                    Full Stack de la escuela online Soy Henry, esta iniciativa esta pensada para poner en practica
                    los conocimientos adquiridos durante las clases teórico-prácticas impartidas durante el curso,
                    entre los principales objetivos de la creación y desarrollo de esta app están el afirmar y conectar
                    los conceptos aprendidos durante la carrera, aprender mejores prácticas, aprender y practicar el
                    workflow de GIT, y usar y practicar testing. <br /> <br />
                    Entre las tecnologías que se usaron para el desarrollo de esta aplicación están:
                </p>
                <div className={styles.divTech}>
                    <div className={styles.divFront}>
                        <h3>Frontend</h3>
                        <ul>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>Javascript</li>
                            <li>React JS</li>
                            <li>Redux</li>
                        </ul>
                    </div>
                    <div className={styles.divBack}>
                        <h3>Backend</h3>
                        <ul>
                            <li>Node JS</li>
                            <li>Express</li>
                            <li>PostgreSQL</li>
                            <li>Sequelize</li>
                            <li>API REST</li>
                        </ul>
                    </div>
                </div>
                <p>
                    Ademas del uso de GIT y GitHub para llevar un buen registro de los cambios realizados en el código de la aplicación
                    y que servirá de base para futuras mejoras que pueda recibir esta aplicación y para poder controlar el versionado
                    de la misma.
                </p>
            </div>

            <div className={styles.divRedes}>
                <h1> Mis redes</h1>
                <div className={styles.divRedesImg}>

                    <div className={styles.divGit} title='Perfil de Github'>
                        <a target='_blank' rel="noreferrer" href="https://github.com/PedroMidueno">
                            <img src="logosFooter/github.png" alt="Github" />
                        </a>
                    </div>

                    <div className={styles.divLinkedIn} title='Perfil de LinkedIn'>
                        <a target='_blank' rel="noreferrer" href="https://www.linkedin.com/in/pedromidueno/">
                            <img src="logosFooter/linkedin.png" alt="LinkedIn" />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}