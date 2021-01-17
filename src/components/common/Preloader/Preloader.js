//import React from 'react';
import preloader from "../../../assets/images/preloader.svg";
import style from "./Preloader.module.css";


let Preloader = (props) => {
    return <div className={style.animation}>
        <div className="packman">
            <img src={preloader}
                alt={preloader}
            />
        </div>
        
    </div>
}

export default Preloader;

//style={ backgroundColor: 'red' }