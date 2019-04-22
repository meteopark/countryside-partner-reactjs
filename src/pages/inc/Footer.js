import React, {Component} from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';

const Footer = () => {

    return (

        <div className={styles['footer']}>
            <p>
                박유성<br/>
                email : <a href="mailto:yspark@meteopark.dev">yspark@meteopark.dev</a><br/>
            2019 <b>METEOPARK</b> All rights reserved.</p>
        </div>
    )
}
export default Footer