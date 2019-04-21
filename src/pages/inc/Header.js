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
import Main from "../main/Main";
import {Main2} from "../main/Main2";


export class Header extends Component {

    render() {

        return (
            <div className="container">
                <Navbar bg="light" variant="light" expand="lg" className="justify-content-center">
                    <Navbar.Brand className={styles['header-title']} href="/" >
                        <div className={styles['header-title']}>우리마을체험</div>
                    </Navbar.Brand>

                </Navbar>


                <Navbar sticky="top" bg="light" variant="light" expand="lg">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to="/village" className="nav-link"><div className={classNames(styles['header-menu'], styles['sub-title-menu'])}>마을</div></NavLink>
                            <NavLink to="/village2" className="nav-link"><div className={classNames(styles['header-menu'], styles['sub-title-menu'])}>숙박예약</div></NavLink>
                            <NavLink to="#hoddme" className="nav-link"><div className={classNames(styles['header-menu'], styles['sub-title-menu'])}>특산물</div></NavLink>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="찾고싶은 마을 검색해보세요" className="mr-sm-2" />
                            <Button variant="outline-success">검색</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>


                <Switch>
                    <Route exact path="/village" component={Main} />
                    <Route exact path="/village2" component={Main2}/>
                </Switch>
            </div>


        )
    }


}
