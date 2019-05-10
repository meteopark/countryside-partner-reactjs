import React, {Component} from 'react';
import styles from './Header.module.scss';
import * as reactIconFa from "react-icons/fa";

const Footer = () => {

    return (

        <div className={styles['footer']}>
            <p>
                박유성<br/>
                email : <a href="mailto:yspark@meteopark.dev">yspark@meteopark.dev</a><br/>
                2019 <b>METEOPARK</b> All rights reserved.
            </p>
            <p>
                <reactIconFa.FaLaravel color="#F15F5F" size="2em" className={styles['icon']}/>
                <reactIconFa.FaReact color="#5CD1E5" size="2em" className={styles['icon']}/>
                <reactIconFa.FaAws color="#E0B94F" size="2em" className={styles['icon']}/>
            </p>
        </div>
    )
}
export default Footer