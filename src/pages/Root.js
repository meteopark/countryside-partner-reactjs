import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Header} from "./Inc/Header";



export class Root extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
            </BrowserRouter>
        );
    }
}
