import React, { Component } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';
import LoginComplete from "./LoginComplete";
import {LoginRequest} from "./LoginRequest";
import {connect, useSelector} from "react-redux";

import * as importActions from "../../actions";
import {bindActionCreators} from "redux";


class TopBar extends Component {

     constructor(props){

         super(props);

     }

    render() {

        return (
            <div>
                <div className={classNames("container", styles['top-bar'])}>
                    { this.props.mapStateToPropsAuth.is_logged ? <LoginComplete /> : <LoginRequest/>}
                </div>
            </div>
        )
    }
    componentDidMount() {

         if (localStorage.getItem('token')) {
             const {actionMentor} = this.props;
             actionMentor.authCheck();
         }
    }

}

const mapStateToProps = (state) => ({
    mapStateToPropsAuth: state.auth // state.variable_state 는 reducers/index.js 의 키값과 같아야 한다
})
const mapDispatchToProps = (dispatch) => ({
    actionMentor: bindActionCreators(importActions, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);