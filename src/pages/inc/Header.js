import React, { Component } from 'react';
import {Link, NavLink, Route, Switch} from "react-router-dom";
import {
    Form,
    FormControl,
    Button,
    Nav,
    Navbar } from 'react-bootstrap';

import styles from './Header.module.scss';
import classNames from 'classnames';
import '../../gg-font.css';


export class Header extends Component {

    render() {

        return (
            <div>
            <div className={classNames('container-fluid', styles['custom-container-fluid-top'])}>
                <Link to="/" className={styles['link']}><div className={styles['header-title']}><img src="/images/ico/apple-icon-76x76.png" alt=""/>시골짝꿍</div></Link>
            </div>
            <div className={classNames('container-fluid', styles['custom-container-fluid'])}>
                <div className="container">
                    <Navbar sticky="top" bg="light" variant="light" expand="lg">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <NavLink to="/mentors" className="nav-link"><div className={classNames(styles['header-menu'])}>멘토소개</div></NavLink>
                                <NavLink to="/mentees" className="nav-link"><div className={classNames(styles['header-menu'])}>멘티소개</div></NavLink>
                                <NavLink to="/machines" className="nav-link"><div className={classNames(styles['header-menu'])}>전국 농기계 현황</div></NavLink>
                                <NavLink to="/dictionary" className="nav-link"><div className={classNames(styles['header-menu'])}>우리말 농업용어</div></NavLink>
                            </Nav>
                            {/*<Form inline>*/}
                            {/*    <FormControl type="text" placeholder="찾고싶은 마을 검색해보세요" className="mr-sm-2" />*/}
                            {/*    <Button variant="outline-success">검색</Button>*/}
                            {/*</Form>*/}
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
            </div>


        )
    }


}
