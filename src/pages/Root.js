import React from 'react';
import {BrowserRouter,Router, Route, Switch} from "react-router-dom";
import Main from "./main/Main";
import {Header} from "./inc/Header";
import Footer from "./inc/Footer";
import styles from "../index.module.scss";
import SideNav from "./inc/SideNav";


import Village from "./villages/Village";
import MentoCreate from "./users/mento/MentoCreate";
import history from './history';


export class Root extends React.Component {

    render() {
        return (
            <Router history={history}>
                {/*<Header />*/}
                <div>
                    {/*<SideNav />*/}
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/villages/:village_code" component={Village} />
                        <Route exact path="/users/mento/create" component={MentoCreate} />
                    </Switch>
                </div>
                <Footer />
            </Router>
        );
    }
}
