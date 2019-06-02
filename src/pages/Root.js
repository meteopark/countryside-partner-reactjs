import React from 'react';
import {BrowserRouter,Router, Route, Switch, withRouter} from "react-router-dom";
import Main from "./main/Main";
import TopBar from "./inc/TopBar";
import {Header} from "./inc/Header";
import Footer from "./inc/Footer";
import styles from "../index.module.scss";
import SideNav from "./inc/SideNav";
import history from './history';

import MentorCreate from "./join/MentorCreate";
import MenteeCreate from "./join/MenteeCreate";


import Mentors from "./mentors/Mentors";
import Mentees from "./mentees/Mentees";
import Mentor from "./mentors/Mentor";
import Diary from "./diaries/Diary";
import Machine from "./openapis/Machine";
import Dictionary from "./openapis/Dictionary";
import SelectJoin from "./join/SelectJoin";
import MentorDiaryCreate from "./mentors/MentorDiaryCreate";
import MentorDiaryModify from "./mentors/MentorDiaryModify";
import MentorDiaryView from "./mentors/MentorDiaryView";



export class Root extends React.Component {

    render() {
        return (
            <Router history={history}>
                <TopBar />
                <Header/>
                <div>
                    {/*<SideNav />*/}
                    <Switch>
                        <Route exact path="/" component={Main} />


                        <Route exact path="/mentees" component={Mentees} />

                        <Route exact path="/mentors" component={Mentors} />
                        <Route exact path="/mentors/:mentor" component={Mentor} />
                        <Route exact path="/mentors/:mentor/create" component={MentorDiaryCreate} />
                        <Route exact path="/mentors/:mentor/diaries/:diary_id" component={MentorDiaryView} />
                        <Route exact path="/mentors/:mentor/diaries/:diary_id/modify" component={MentorDiaryModify} />


                        <Route exact path="/machines" component={Machine} />
                        <Route exact path="/dictionary" component={Dictionary} />



                        {/*{localStorage.getItem('token') && <Route exact path="/join" component={SelectJoin} />}*/}
                        <Route exact path="/join" component={SelectJoin} />
                        <Route exact path="/join/mentor" component={MentorCreate} />
                        <Route exact path="/join/mentee" component={MenteeCreate} />




                        {/*Route::get('diaries-mentors/articles/{diary_id}', array( //  멘토 - 영농일지 선택 조회*/}
                        {/*'as' => 'diaries-mentors.articles.show',*/}
                        {/*'uses' => 'MentorDiaryController@show'*/}
                        {/*));*/}



                    </Switch>
                </div>
                <Footer />
            </Router>
        );
    }
}
