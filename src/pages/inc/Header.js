import React, {Component} from 'react';
import {Link, NavLink, Route, Switch} from "react-router-dom";
import {
    Form,
    FormControl,
    Button,
    Nav,
    Navbar
} from 'react-bootstrap';

import styles from './Header.module.scss';
import classNames from 'classnames';
import '../../gg-font.css';


export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidenavWidth: 0,

            hideNav: false
        }

    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        this.setState({hideNav: window.innerWidth <= 991});
    }

    render() {

        return (
            <div>
                {this.state.hideNav === false ?
                    <div className={classNames('container-fluid', styles['custom-container-fluid-top'])}>
                        <Link to="/" className={styles['link']}>
                            <div className={styles['header-title']}><img src="/images/ico/homi.png" alt=""/>시골짝꿍
                            </div>
                        </Link>
                    </div>
                    : ""}

                <div className={classNames('container-fluid', styles['custom-container-fluid'])}>
                    <div className="container">
                        <Navbar bg="light" variant="light" expand="lg">
                            {this.state.hideNav === false ? <Navbar.Brand href="/" className={styles['empty-brand']}>&nbsp;</Navbar.Brand> : ""}

                            {this.state.hideNav === true ?
                                <div className={styles['header-m']}>
                                    {this.state.hideNav === false ?
                                        <div className={classNames('container-fluid', styles['custom-container-fluid-top'])}>
                                            <Link to="/" className={styles['link']}>
                                                <div className={styles['header-title']}><img src="/images/ico/homi.png" alt=""/>시골짝꿍
                                                </div>
                                            </Link>
                                        </div>
                                        : ""}
                                    <Navbar.Toggle />
                                    <Link to="/" className={styles['link']}>
                                        <div className={styles['header-title-m']}><img src="/images/ico/homi.png" alt=""/>시골짝꿍</div>
                                    </Link>
                                </div>
                                : <Navbar.Toggle />}

                            <Navbar.Collapse bsPrefix={'navbar-collapse'}>
                                <div className={styles['navbar-coll']}>
                                <Nav className="mr-auto">
                                    <NavLink to="/introduce" className="nav-link">
                                        <div className={classNames(styles['header-menu'])}>시골짝꿍 소개</div>
                                    </NavLink>
                                    <NavLink to="/mentors" className="nav-link">
                                        <div className={classNames(styles['header-menu'])}>멘토소개</div>
                                    </NavLink>
                                    <NavLink to="/mentees" className="nav-link">
                                        <div className={classNames(styles['header-menu'])}>멘티소개</div>
                                    </NavLink>
                                    <NavLink to="/educationFarms" className="nav-link">
                                        <div className={classNames(styles['header-menu'])}>농촌 교육농장</div>
                                    </NavLink>
                                    <NavLink to="/empty-houses" className="nav-link">
                                        <div className={classNames(styles['header-menu'])}>농촌 빈집정보</div>
                                    </NavLink>
                                    <NavLink to="/machines" className="nav-link">
                                        <div className={classNames(styles['header-menu'])}>전국 농기계 현황</div>
                                    </NavLink>
                                    <NavLink to="/dictionary" className="nav-link">
                                        <div className={classNames(styles['header-menu'])}>우리말 농업용어</div>
                                    </NavLink>
                                    <NavLink to="/special-crops" className="nav-link">
                                        <div className={classNames(styles['header-menu'])}>특용작물 생산 통계</div>
                                    </NavLink>


                                    {/*<NavLink to="/chat" className="nav-link"><div className={classNames(styles['header-menu'])}>귀농귀촌 지능형 상담</div></NavLink>*/}
                                    {/*<NavLink to="/dictionary" className="nav-link"><div className={classNames(styles['header-menu'])}>관련 사이트</div></NavLink>*/}
                                </Nav>
                                {/*<Form inline>*/}
                                {/*    <FormControl type="text" placeholder="찾고싶은 마을 검색해보세요" className="mr-sm-2" />*/}
                                {/*    <Button variant="outline-success">검색</Button>*/}
                                {/*</Form>*/}
                                </div>
                            </Navbar.Collapse>

                            {/*<Navbar.Brand href="#home">React-</Navbar.Brand>*/}
                        </Navbar>
                    </div>
                </div>
            </div>


        )
    }


}
