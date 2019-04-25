import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "./main/Main";
import Village from "./villages/Village";
import {Header} from "./inc/Header";
import Footer from "./inc/Footer";
import styles from "./villages/Village.module.scss";
import SideNav from "./inc/SideNav";


export class Root extends React.Component {

    render() {
        return (
            <BrowserRouter>
                {/*<Header />*/}
                <div className={styles['full-container']}>
                    {/*<SideNav />*/}
                    <hr/>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/villages/:village_code" component={Village} />
                    </Switch>
                </div>
                <Footer />
            </BrowserRouter>
        );
    }
}
