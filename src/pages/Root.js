import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "./main/Main";
import {Header} from "./inc/Header";
import Footer from "./inc/Footer";
import styles from "../index.module.scss";
import SideNav from "./inc/SideNav";


import Village from "./villages/Village";
import UserCreate from "./users/UserCreate";


export class Root extends React.Component {

    render() {
        return (
            <BrowserRouter>
                {/*<Header />*/}
                <div>
                    {/*<SideNav />*/}
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/villages/:village_code" component={Village} />
                        <Route exact path="/user/create" component={UserCreate} />
                    </Switch>
                </div>

                <Footer />
            </BrowserRouter>
        );
    }
}
