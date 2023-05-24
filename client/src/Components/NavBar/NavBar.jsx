import React from "react";
import styles from './NavBar.module.css';
import SearchBar from "../SearchBar/SearchBar";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {

    const location = useLocation();

    const showMenu = () => {
        const menu = document.getElementById('menu')
        const openButton = document.getElementById('openMenu')
        const closeMenu = document.getElementById('closeMenu')
        menu.classList.add(styles.visible)
        openButton.classList.add(styles.hidden)
        closeMenu.classList.add(styles.visible)
    }

    const hideMenu = () => {
        const menu = document.getElementById('menu')
        const openButton = document.getElementById('openMenu')
        const closeMenu = document.getElementById('closeMenu')
        menu.classList.remove(styles.visible)
        openButton.classList.remove(styles.hidden)
        closeMenu.classList.remove(styles.visible)
    }

    return (
        <>
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

                {/* Esta parte se mostrará para dispositivos de pantalla más pequeña */}

                <div className={styles.menuButtons}>
                    <button className={styles.openMenu} id="openMenu" onClick={showMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <button className={styles.closeMenu} id="closeMenu" onClick={hideMenu}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>

                </div>
            </div>


            <div className={styles.menuLinks} id="menu">

                <NavLink to='/home' className={({ isActive }) =>
                    isActive ? styles.active : null
                } onClick={hideMenu}>Inicio</NavLink>

                <NavLink to='/activity/create' className={({ isActive }) =>
                    isActive ? styles.active : null
                } onClick={hideMenu}>Crear Actividad</NavLink>

                <NavLink to='/about' className={({ isActive }) =>
                    isActive ? styles.active : null
                } onClick={hideMenu}>Acerca de la App</NavLink>

            </div>

        </>

    )
}