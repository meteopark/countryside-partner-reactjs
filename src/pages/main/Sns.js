import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import styles from './Main.module.scss';
import classNames from 'classnames';
import API from "../api/api";


export function Sns() {

    const [blogRss, setBlogRss] = useState([]);
    const [twitter, setTwitter] = useState([]);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        getSns();

    }, []);

    const convertTIme = (time) => {

        let date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ").split(".")[0]);
        let diff = (((new Date()).getTime() - date.getTime()) / 1000);
        diff = diff - 33000;
        if (diff < 0) diff = 0;
        let day_diff = Math.floor(diff / 86400);
        if (isNaN(day_diff) || day_diff < 0)
            return;

        return day_diff === 0 && (
            diff < 60 && "방금전" ||
            diff < 120 && "1분전" ||
            diff < 3600 && Math.floor(diff / 60) + " 분전" ||
            diff < 7200 && "1 시간전" ||
            diff < 86400 && Math.floor(diff / 3600) + " 시간전") ||
            day_diff === 1 && "어제" ||
            day_diff < 7 && day_diff + " 일전" ||
            day_diff < 31 && Math.floor(day_diff / 7) + " 주전" ||
            day_diff < 360 && Math.floor(day_diff / 30) + " 개월 전" ||
            day_diff >= 360 && (Math.floor(day_diff / 360) === 0 ? 1 : Math.floor(day_diff / 360)) + " 년 전"

    }

    const getSns = () => {

        API.getSns().then((res) => {

            let blogContents = res.naverblog.map((b, i) => {

                return (

                    <a href={b.link} target="_blank" key={i} className={styles['link']}>
                        <Row className={styles['sns-contents-container']}>
                            <Col>
                                <div className={styles['sns-time']}><small className="text-right">{convertTIme(b.pubDate)}</small></div>
                                <p className={styles['sns-contents']}>
                                    {b.description.substr(0, 120)}...
                                </p>
                                <hr className={styles['sns_hr']}/>
                            </Col>
                        </Row>
                    </a>
                );
            });
            setBlogRss(blog => blog.concat(blogContents));

            let twitterContents = res.twitter.map((t, i) => {

                return (

                    <a href={t.url} target="_blank" key={i} className={styles['link']}>
                        <Row className={styles['sns-contents-container']}>
                            <Col>
                                <div className={styles['sns-time']}><small className="text-right">{convertTIme(t.created_at)}</small></div>
                                <p className={styles['sns-contents']}>
                                    {t.text.substr(0, 120)}...
                                </p>
                                <hr className={styles['sns_hr']}/>
                            </Col>
                        </Row>
                    </a>
                );
            });
            setTwitter(tw => tw.concat(twitterContents));
        });
    }

    const styleContainer = {
        padding: 0,
    };

    return (
        <div className={classNames('container')} style={styleContainer}>
            <Row className="justify-content-md-center">
                <Col sm>
                    <div
                        className={classNames('container', styles['in-container'], styles['auto-container'], styles['naverblog-color'])}>
                        <p className={styles['header-container']}>
                            <img src="/images/ico/blog.png" className={styles['image-ico']}/>&nbsp;농촌진흥청 공식 네이버블로그
                        </p>
                        {blogRss}
                    </div>
                </Col>
                <Col sm>
                    <div
                        className={classNames('container', styles['in-container'], styles['auto-container'], styles['twitter-color'])}>
                        <p className={styles['header-container']}>
                            <img src="/images/ico/twitter.png" className={styles['image-ico']}/>&nbsp;농촌진흥청 공식 트위터
                        </p>
                        {twitter}
                    </div>
                </Col>
            </Row>
        </div>
    )
}