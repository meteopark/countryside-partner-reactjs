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


// class LoginComplete extends Component {
//
//
//
//     render() {
//
//         return (
//             <div>
//                 <Link className={styles['link']} to={`/${localStorage.getItem('user_type')}s/${localStorage.getItem('srl')}`}>영농일지</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//                 <Link className={styles['link']} to="/mypage">마이페이지</Link>&nbsp;&nbsp;&nbsp;&nbsp;
//                 <a className={styles['link']} onClick={this.handleLogOut}>로그아웃</a>
//             </div>
//         )
//     }
//
//     componentDidMount() {
//        console.log("cmo...", localStorage.getItem('user_type'));
//     }
//
// }
// const mapDispatchToProps = (dispatch) => ({
//     actions: bindActionCreators(importActions, dispatch),
// })
// const mapStateToProps = (state) => ({
//     mapStateToProps: state.auth // state.variable_state 는 reducers/index.js 의 키값과 같아야 한다
// })
// export default connect(null, mapDispatchToProps)(LoginComplete);

