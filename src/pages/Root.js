import React from 'react';
import {BrowserRouter,Router, Route, Switch} from "react-router-dom";
import Main from "./main/Main";
import {Header} from "./inc/Header";
import Footer from "./inc/Footer";
import styles from "../index.module.scss";
import SideNav from "./inc/SideNav";
import history from './history';

import Village from "./villages/Village";
import MentorCreate from "./join/MentorCreate";
import MenteeCreate from "./join/MenteeCreate";


import Mentors from "./mentors/Mentors";
import Mentor from "./mentors/Mentor";



export class Root extends React.Component {

    render() {
        return (
            <Router history={history}>
                <Header />
                <div>
                    <SideNav />
                    <Switch>
                        <Route exact path="/" component={Main} />

                        <Route exact path="/mentors" component={Mentors} />
                        <Route exact path="/mentors/:mentor" component={Mentor} />

                        <Route exact path="/join/mentor" component={MentorCreate} />
                        <Route exact path="/join/mentee" component={MenteeCreate} />





                        <Route exact path="/villages/:village_code" component={Village} />
                    </Switch>
                </div>
                <Footer />
            </Router>
        );
    }
}
