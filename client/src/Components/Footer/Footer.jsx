import React from "react";
import styles from './Footer.module.css';

export default function Footer(props) {


    return (
        <div className={styles.divFooter}>
            <div className={styles.divHenry}>
                <a target='_blank' rel="noreferrer" href="https://www.soyhenry.com/">
                    <img src="logosFooter/favicon.ico" alt="Logo Henry" title="Sitio web de Soy Henry"/>
                </a>
            </div>

            <div className={styles.divAutor}>
                <h4>App desarrollada por Pedro Midueño</h4>
            </div>

            <div className={styles.divRedes}>
                <a target='_blank' rel="noreferrer" href="https://github.com/PedroMidueno">
                    <img src="logosFooter/github.png" alt="Link a Github" title="GitHub del autor" />
                </a>
                <a target='_blank' rel="noreferrer" href="https://www.linkedin.com/in/pedromidueno/">
                    <img src="logosFooter/linkedin.png" alt="Link a LinkedIn" title="LinkedIn del autor"/>
                </a>
            </div>
        </div>
    )
}