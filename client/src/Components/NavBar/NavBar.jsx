import React from "react";
import styles from './NavBar.module.css';
import SearchBar from "../SearchBar/SearchBar";
import { NavLink, useLocation } from "react-router-dom";

export default function NavBar(props) {

    const location = useLocation();
    
    return (
        <div className={styles.divNavBar}>
            <div className={styles.divLinks}>
                <NavLink to='/'>
                    <div className={styles.divImg} title='Ir a la pantalla principal'>
                        <img src="logoApp.png" alt="Logo Countries" />
                        <h2>PI Countries</h2>
                    </div>
                </NavLink>


                <div className={styles.divHome}>
                    <NavLink to='/home' className={({ isActive }) =>
                        isActive ? styles.active : null
                    }>Inicio</NavLink>
                </div>

                <div className={styles.divForm}>
                    <NavLink to='/activity/create' className={({ isActive }) =>
                        isActive ? styles.active : null
                    }>Crear<br />actividad</NavLink>
                </div>

                <div className={styles.divAbout}>
                    <NavLink to='/about' className={({ isActive }) =>
                        isActive ? styles.active : null
                    }>Acerca de<br />la App</NavLink>
                </div>
            </div>

            <div className={styles.divSearch}>
                {location.pathname.includes('/home') &&
                    <div>
                        <SearchBar />
                    </div>}
            </div>
        </div>
    )
}