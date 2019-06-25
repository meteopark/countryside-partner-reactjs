import React, {useEffect, useState} from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styles from './Main.module.scss';
import classNames from 'classnames';
import * as reactIconFa from "react-icons/fa";
import API from "../api/api";


export function BestDiaries() {

    const [bestDiaries, setBestDiaries] = useState([]);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        getBestDiaries();

    }, []);

    const getBestDiaries = () => {

        API.getBestDiaries().then((res) => {

            let contents = res.map((best, i) => {

                return (

                    <Link className={classNames(styles['link'])}
                          to={`/mentors/${best.mentor_srl}/diaries/${best.diary_srl}`} key={i}>
                        <Row
                            key={i}
                            className={classNames('justify-content-md-center', styles['best-contents'])}>
                            {
                                best.image ?
                                    <Col lg={{span: 2, order: 1}}><Image
                                        src={best.image}
                                        className={styles['blog-image']}/></Col>
                                    : ""
                            }
                            <Col lg={{span: best.image ? 8 : 10, order: 2}} className={styles['blog-post']}>
                                <h5 className={styles['blog-title']}>{best.title}</h5>
                                <p className={styles['blog-post-contents']}>{best.contents.substr(0, 190)}</p>
                            </Col>
                        </Row>
                    </Link>
                );

            });
            setBestDiaries(best => best.concat(contents));
        });
    }

    return (
        <div className={classNames('container', styles['in-container'])}>
            <p className={styles['header-container']}>
                <reactIconFa.FaBookOpen className={styles['main-icon']}/>
                베스트 콘텐츠
            </p>
            {bestDiaries}
        </div>
    )
}