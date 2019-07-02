import React, { Component } from 'react';
import styles from './Header.module.scss';
import {Link, withRouter} from "react-router-dom";
import history from "../history";
import * as importActions from "../../actions";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';


export function LoginComplete({loginInfo, handleLogOut}){


    return (
        <div>
            <Link className={styles['link']} to={`/${loginInfo.user_type}s/${loginInfo.srl}`}>영농일지</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link className={styles['link']} to="/mypage">마이페이지</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <a className={styles['link']} onClick={handleLogOut}>로그아웃</a>
        </div>
    )
}