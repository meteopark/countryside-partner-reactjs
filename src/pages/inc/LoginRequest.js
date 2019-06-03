import React, { Component } from 'react';
import styles from './Header.module.scss';
import {Link} from "react-router-dom";

export class LoginRequest extends Component {

    render() {

        return (
            <div>
                <Link className={styles['link']} to="/login">로그인</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                <Link className={styles['link']} to="/join">회원가입</Link>
            </div>
        )
    }


}
