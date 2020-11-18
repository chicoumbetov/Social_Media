import React from 'react';
import preloader from "../../../assets/images/preloader.svg";
import style from "./Preloader.module.css";


let Preloader = (props) => {
    return <div className={style.animation}>
        <img src={preloader}
            alt={preloader}
        />
    </div>
}

export default Preloader;

//style={ backgroundColor: 'red' }