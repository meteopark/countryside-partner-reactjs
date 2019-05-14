import React, { Component } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';
import LoginComplete from "./LoginComplete";
import {LoginRequest} from "./LoginRequest";
import {connect} from "react-redux";


class TopBar extends Component {

     constructor(props){
         super(props);


     }

    render() {

        return (
            <div>
                <div className={classNames("container", styles['top-bar'])}>
                    {/*{localStorage.getItem('token') ? <LoginComplete /> : <LoginRequest/>}*/}
                    {this.props.variable_state.is_logged ? <LoginComplete /> : <LoginRequest/>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    variable_state: state.variable_state // state.variable_state 는 reducers/index.js 의 키값과 같아야 한다
})
export default connect(mapStateToProps)(TopBar);