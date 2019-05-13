import React, {Component} from 'react';

import styles from './Join.module.scss';
import classNames from "classnames";
import {Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as reactIconFa from "react-icons/fa";
class SelectJoin extends Component {


    render() {


        return (


            <div className={classNames('container', styles['in-container'])}>

                <h4 className={classNames('text-center', styles['join-title'])}>회원가입</h4>
                <hr/>

                <Row className="justify-content-md-center">

                    <Col md={3}>
                        <Link className={styles['link']} to={`/join/mentor`}>
                            <div className={classNames(styles['join-card'], styles['mentor'])}>
                                <p className={styles['card-title']}>멘토</p>
                                <p className={styles['card-summary']}>농업 전문 지도자가 되어 보세요.</p>
                                <reactIconFa.FaRegHandPointer size="2em"/>
                            </div>
                        </Link>
                    </Col>
                    <Col md={3}>
                        <Link className={styles['link']} to={`/join/mentee`}>
                            <div className={classNames(styles['join-card'], styles['mentee'])}>
                                <p className={styles['card-title']}>멘티</p>
                                <p className={styles['card-summary']}>농업 꿈나무가 되어 보세요.</p>
                                <reactIconFa.FaRegHandPointUp size="2em"/>
                            </div>
                        </Link>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <ul className={styles['join-warning']}>
                            <li>각 유형에 따라 가입절차가 다릅니다. 해당하는 유형을 선택하여 가입해주세요.</li>
                            <li>타인의 정보를 무단 사용할 경우 사이트 이용이 제한되며, 관련법에 의해 처벌받게 됩니다.</li>
                            <li>1인 1개의 ID를 생성할 수 있습니다.</li>
                        </ul>
                    </Col>
                </Row>
            </div>


        )
    }
}

export default SelectJoin
