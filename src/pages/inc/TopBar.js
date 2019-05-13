import React, { Component } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';
import {Link} from "react-router-dom";

export class TopBar extends Component {

    render() {

        return (
            <div>
                <div className={classNames("container", styles['top-bar'])}>

                    <Link className={styles['link']} to="/join">로그인</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link className={styles['link']} to={`/join`}>회원가입</Link>
                </div>
            </div>

        )
    }


}
