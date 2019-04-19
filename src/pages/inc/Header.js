import React from 'react';
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import {
    Card, CardColumns,
    Form,
    FormControl,
    Button,
    Nav,
    Navbar } from 'react-bootstrap';

import {Main} from "../main/Main";
import {Main2} from "../main/Main2";
import {ControlledCarousel} from "./ControlledCarousel";

import './Header.scss';



export class Header extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };


        this.state = {
            level: [1,1,1,1,1,1,1,1,1,1,1,1]
        };
    }


    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {

        return (
            <div className="container">
                <Navbar bg="light" variant="light" expand="lg" className="justify-content-center" >
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                </Navbar>

                <Navbar bg="light" variant="light" expand="lg">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to="/village" className="nav-link">마을</NavLink>
                            <NavLink to="/village2" className="nav-link">숙박예</NavLink>
                            <NavLink to="#hoddme" className="nav-link">특산물</NavLink>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>


                <CardColumns>
                    {this.state.level.map((item) => (
                    <Card>
                        <Card.Header>자연여행</Card.Header>
                        <Card.Img variant="top" src="http://www.welchon.com/upload/2013/04/09/79869590845248258632_thumbnail1.jpg" />
                        <Card.Body>
                            <Card.Title>치래마을</Card.Title>
                            <Card.Text>
                                백두대간 구룡령 아래 첫 동네, 있는 그대로의 청정 자연을 보존하자!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    ))}
                </CardColumns>
                <ControlledCarousel/>



                <Switch>
                    <Route exact path="/village" component={Main}></Route>
                    <Route exact path="/village2" component={Main2}></Route>
                </Switch>
            </div>


        )
    }


}
