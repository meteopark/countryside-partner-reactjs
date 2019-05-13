import React, { Component } from 'react';
import {NavLink, Route, Switch} from "react-router-dom";
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
            <div className={classNames('container-fluid', styles['custom-container-fluid'])}>
                <div className="container">
                    <Navbar bg="light" variant="light" expand="lg" className="justify-content-center">
                        <Navbar.Brand className={styles['header-title']} href="/" >
                            <div className={styles['header-title']}><img src="" alt=""/></div>
                        </Navbar.Brand>
                    </Navbar>
                    <Navbar sticky="top" bg="light" variant="light" expand="lg">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <NavLink to="/mentors" className="nav-link"><div className={classNames(styles['header-menu'], styles['sub-title-menu'])}>멘토소개</div></NavLink>
                                <NavLink to="/village2" className="nav-link"><div className={classNames(styles['header-menu'], styles['sub-title-menu'])}>멘티소개</div></NavLink>
                                <NavLink to="/village2" className="nav-link"><div className={classNames(styles['header-menu'], styles['sub-title-menu'])}>농업용어</div></NavLink>
                                <NavLink to="/village2" className="nav-link"><div className={classNames(styles['header-menu'], styles['sub-title-menu'])}>전국 농기계 현황</div></NavLink>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="찾고싶은 마을 검색해보세요" className="mr-sm-2" />
                                <Button variant="outline-success">검색</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>


        )
    }


}
