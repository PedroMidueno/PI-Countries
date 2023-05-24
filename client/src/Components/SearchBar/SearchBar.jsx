import React, { useState, useEffect } from "react";
import styles from './SearchBar.module.css';
import { getCountryByName, resetState, changeMessage } from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar(props) {

    const navigate =useNavigate();

    const dispatch = useDispatch();
    
    // eslint-disable-next-line 
    const regexNombre = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;

    const [name, setName] = useState('')
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        !name.length && setShowButton(false)
        !showButton && dispatch(resetState());
    }, [name, showButton, dispatch])

    const handleInput = (e) => {
        setName(e.target.value)
        let text = document.getElementById('write');
        text.classList.remove(styles.errorText)
        text.classList.add(styles.normalText)
        setShowButton(true)
    }

    const findCountries = () => {
        dispatch(changeMessage(`No se encontro un país con la palabra "${name}"`))
        if (name === '') {
            window.alert('Error: "Campo obligatorio vacio."');
            let text = document.getElementById('write');
            text.classList.remove(styles.normalText)
            text.classList.add(styles.errorText)
            return;
        }

        if (regexNombre.test(name)) {
            window.alert('Error: El nombre no puede incluir caracteres especiales.')
            let text = document.getElementById('write');
            text.classList.remove(styles.normalText)
            text.classList.add(styles.errorText)
            return;
        }

        navigate(`?inicio=1&fin=10`)
        dispatch(getCountryByName(name))
        
    }


    function limpiar() {
        let text = document.getElementById('write');
        text.classList.remove(styles.errorText)
        text.classList.add(styles.normalText)
        const texto = document.getElementById('write');
        texto.value = ""
        dispatch(resetState());
        setShowButton(false)
    }

    return (
        <div className={styles.divSearch}>
            <div><label htmlFor="write">Buscar país por nombre:</label></div>
            <div>
                <button className={showButton ? styles.visible : styles.noVisible}
                    onClick={() => {
                        limpiar();
                        setName('')
                    }}>X</button>


                <input type="text" placeholder="Ingrese un nombre" id='write' onChange={handleInput}
                    className={styles.normalText} value={name} maxLength='45'/>

                <button id='boton' onClick={findCountries} className={styles.botonBuscar}>Buscar</button>
                <button id='boton' onClick={findCountries} className={styles.botonBuscarMini}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </div>
    )
}