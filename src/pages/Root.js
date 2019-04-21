import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Main from "./main/Main";



export class Root extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        );
    }
}
