import React from 'react';
import styles from './Header.module.scss';
import * as reactIconFa from "react-icons/fa";

const Footer = () => {

    return (

        <footer className={styles['footer']}>
            <p>
                Email : <a href="mailto:yspark@meteopark.dev">yspark@meteopark.dev</a><br/>
                © 2019 <b>METEOPARK</b> All rights reserved.
            </p>
            {/*<p>*/}
            {/*    <reactIconFa.FaLaravel color="#F15F5F" size="1.5em" className={styles['icon']}/>*/}
            {/*    <reactIconFa.FaReact color="#5CD1E5" size="1.5em" className={styles['icon']}/>*/}
            {/*</p>*/}
        </footer>
    )
}
export default Footer