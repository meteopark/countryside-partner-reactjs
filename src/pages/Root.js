import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "./main/Main";
import Village from "./villages/Village";


export class Root extends React.Component {

    render() {
        return (
            <BrowserRouter>

                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/villages/:village_code" component={Village} />
                </Switch>
            </BrowserRouter>
        );
    }
}
