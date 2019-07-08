import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styles from './Main.module.scss';
import classNames from 'classnames';
import * as reactIconFa from "react-icons/fa";
import API from "../api/api";
import {WeekFarmInfo} from "./WeekFarmInfo";


export function BestDiaries() {

    const [bestDiaries, setBestDiaries] = useState([]);
    const [isMobile, setMobile] = useState(false);
    const [isFirst, setFirst] = useState(true);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        if(isFirst){
            getBestDiaries();
            setFirst(false);
        }

        window.addEventListener("resize", resize, false);
        return () => window.removeEventListener("resize", resize);


    }, [isMobile]);

    const getBestDiaries = () => {

        API.getBestDiaries().then((res) => {

            let contents = res.map((best, i) => {

                return (

                    <Link className={classNames(styles['link'])}
                          to={`/mentors/${best.mentor_srl}/diaries/${best.diary_srl}`} key={i}>
                        <Row key={i} className={styles['best-contents-container']}>
                            <Col>
                                <h6>{best.title}</h6>
                                <p className={styles['best-contents']}>
                                    {best.contents.substr(0, 140)}...
                                </p>
                                <hr/>
                            </Col>
                        </Row>
                    </Link>
                );
            });
            setBestDiaries(best => best.concat(contents));
        });
    }

    const resize = () => {
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav !== isMobile) {
            setMobile(currentHideNav);
        }
    }

    return (
        <div className={classNames('container')} style={!isMobile ? {padding: '0'}: {}} >
            <Row className="justify-content-md-center">
                <Col sm>
                    <div className={classNames('container', styles['in-container'], styles['auto-container'])}>
                        <p className={styles['header-container']}>
                            <reactIconFa.FaBookOpen className={styles['main-icon']}/>
                            베스트 콘텐츠
                        </p>
                        {bestDiaries}
                    </div>
                </Col>
                <Col sm>
                    <WeekFarmInfo/>
                </Col>
            </Row>
        </div>
    )
}