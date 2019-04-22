import React, {Component} from 'react';
import styles from './SideNav.module.scss';

const SideNav = () => {

    return (

        <div className={styles['sidenav']}>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#clients">Clients</a>
            <a href="#contact"><img src="http://www.welchon.com/upload/board/2015/04/21/1429595284759_955_thumbnail1.jpg"/></a>
        </div>
    )
}
export default SideNav