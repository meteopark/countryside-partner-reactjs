import React, { Component } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';
import {LoginComplete} from "./LoginComplete";
import {LoginRequest} from "./LoginRequest";
import {connect} from "react-redux";

import * as importActions from "../../actions";
import {bindActionCreators} from "redux";
import history from "../history";


class TopBar extends Component {

    handleLogOut = () => {
        localStorage.clear();
        this.props.actions.isLogged(false);
        history.push("/");
    }

    render() {

        const {mapStateToPropsAuth} = this.props;
        return (
            <div>
                <div className={classNames("container", styles['top-bar'])}>
                    { this.props.mapStateToPropsAuth.is_logged ? <LoginComplete loginInfo={mapStateToPropsAuth} handleLogOut={this.handleLogOut}/> : <LoginRequest/>}
                </div>
            </div>
        )
    }
    componentDidMount() {
         if (localStorage.getItem('token')) {
             const {actions} = this.props;
             actions.authCheck();
         }
    }

}

const mapStateToProps = (state) => ({
    mapStateToPropsAuth: state.auth // state.variable_state 는 reducers/index.js 의 키값과 같아야 한다
})
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(importActions, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);