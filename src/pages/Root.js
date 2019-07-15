import React, {Component} from 'react';
import {Router, Route, Switch} from "react-router-dom";
import {Main} from "./main/Main";
import TopBar from "./inc/TopBar";
import {Header} from "./inc/Header";
import Footer from "./inc/Footer";
import styles from "../index.module.scss";
import history from './history';
import * as reactIconFa from "react-icons/fa";
import MentorCreate from "./join/MentorCreate";
import MenteeCreate from "./join/MenteeCreate";
import Mentors from "./mentors/Mentors";
import Mentees from "./mentees/Mentees";
import Mentor from "./mentors/Mentor";
import Machine from "./openapis/Machine";
import Dictionary from "./openapis/Dictionary";
import SelectJoin from "./join/SelectJoin";
import MentorDiaryCreate from "./mentors/MentorDiaryCreate";
import MentorDiaryModify from "./mentors/MentorDiaryModify";
import MentorDiaryView from "./mentors/MentorDiaryView";
import Login from "./join/Login";
import {connect} from "react-redux";
import Mentee from "./mentees/Mentee";
import MenteeDiaryCreate from "./mentees/MenteeDiaryCreate";
import MenteeDiaryView from "./mentees/MenteeDiaryView";
import MenteeDiaryModify from "./mentees/MenteeDiaryModify";
import SpecialCrops from "./openapis/SpecialCrops";
import EmptyHouses from "./openapis/EmptyHouses";
import {Mentoring} from "./chat/Mentoring";
import {MyPage} from "./inc/MyPage";
import {Introduce} from "./main/Introduce";
import {MyPageEndit} from "./inc/MyPageEdit";
import {EducationFarms} from "./openapis/EducationFarms";
import {EducationFarmDetail} from "./openapis/EducationFarmDetail";

class Root extends Component {

    scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    render() {

        return (
            <Router history={history}>
            <div className={styles['wrapper']}>
                    <TopBar/>
                    <Header/>
                    <div className={styles['wrapper']}>
                        {/*<SideNav />*/}
                        <main role="main">
                            <Switch>

                                {this.props.mapStateToPropsAuth.is_logged && <Route exact path="/mentees/:mentee/create" component={MenteeDiaryCreate}/>}
                                {this.props.mapStateToPropsAuth.is_logged && <Route exact path="/mentors/:mentor/create" component={MentorDiaryCreate}/>}
                                {this.props.mapStateToPropsAuth.is_logged && <Route exact path="/chat/mentoring" component={Mentoring} />}
                                {this.props.mapStateToPropsAuth.is_logged && <Route exact path="/chat/mentoring/:chat_id" component={Mentoring} />}
                                {this.props.mapStateToPropsAuth.is_logged && <Route exact path="/mypage" component={MyPage} />}
                                {this.props.mapStateToPropsAuth.is_logged && <Route exact path="/mypage/edit" component={MyPageEndit} />}
                                <Route exact path="/" component={Main}/>
                                <Route exact path="/introduce" component={Introduce}/>
                                <Route exact path="/mentees" component={Mentees}/>
                                <Route exact path="/mentees/:mentee" component={Mentee}/>
                                <Route exact path="/mentees/:mentee/diaries/:diary_id" component={MenteeDiaryView}/>
                                <Route exact path="/mentees/:mentee/diaries/:diary_id/modify" component={MenteeDiaryModify}/>
                                <Route exact path="/mentors" component={Mentors}/>
                                <Route exact path="/mentors/:mentor" component={Mentor}/>
                                <Route exact path="/mentors/:mentor/diaries/:diary_id" component={MentorDiaryView}/>
                                <Route exact path="/mentors/:mentor/diaries/:diary_id/modify" component={MentorDiaryModify}/>


                                <Route exact path="/machines" component={Machine}/>
                                <Route exact path="/dictionary" component={Dictionary}/>
                                <Route exact path="/special-crops" component={SpecialCrops}/>
                                <Route exact path="/emptyHouses" component={EmptyHouses}/>
                                <Route exact path="/educationFarms" component={EducationFarms}/>
                                <Route exact path="/educationFarms/:cntntsNo" component={EducationFarmDetail}/>


                                {!this.props.mapStateToPropsAuth.is_logged && <Route exact path="/login" component={Login}/>}
                                {!this.props.mapStateToPropsAuth.is_logged && <Route exact path="/join" component={SelectJoin}/>}
                                {!this.props.mapStateToPropsAuth.is_logged && <Route exact path="/join/mentor" component={MentorCreate}/>}
                                {!this.props.mapStateToPropsAuth.is_logged && <Route exact path="/join/mentee" component={MenteeCreate}/>}
                                {/*<Redirect from='*' to="/" />*/}
                            </Switch>

                            <div className={styles['float-button-position']}>
                                <div className={styles['float-button']} onClick={() => {this.scrollToTop();}}><reactIconFa.FaChevronUp/></div>
                            </div>
                        </main>
                        <Footer/>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => ({
    mapStateToPropsAuth: state.auth
})
export default connect(mapStateToProps)(Root);
