import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import styles from './Main.module.scss';
import classNames from 'classnames';
import * as reactIconFa from "react-icons/fa";
import API from "../api/api";

export function WeekFarmInfo() {

    const [weekFarmInfo, setWeekFarmInfo] = useState([]);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        getEducationFarms(1);

    }, []);

    const getEducationFarms = (page) => {

        API.getOpenApiWeekFarmInfo(page).then((res) => {

            let week = res.map((w, i) => {

                if (i > 6) {
                    return false;
                }
                return (

                        <Row key={i}>
                            <Col className={styles['col-p-t']}>
                                ◇ {w.subject}&nbsp;&nbsp;
                                <a href={w.downUrl} target="_self" className={styles['link']}><reactIconFa.FaFileDownload className={styles['icon']}/>Download</a>
                                <hr/>
                            </Col>
                        </Row>
                );

            });
            setWeekFarmInfo(week);
        });
    }

    return (
        <div className={classNames('container', styles['in-container'],styles['auto-container'])}>
            <p className={styles['header-container']}>
                <reactIconFa.FaUserGraduate className={styles['main-icon']}/>
                주간 농사 정보
            </p>
            <div className={styles['week-container']}>{weekFarmInfo}</div>
        </div>
    )
}