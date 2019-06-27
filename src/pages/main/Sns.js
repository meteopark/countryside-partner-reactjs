import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import styles from './Main.module.scss';
import classNames from 'classnames';
import API from "../api/api";


export function Sns() {

    const [bestDiaries, setBestDiaries] = useState([]);

    const [blogRss, setBlogRss] = useState([]);
    const [twitter, setTwitter] = useState([]);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        getSns();

    }, []);

    const getSns = () => {

        API.getSns().then((res) => {

            let blogContents = res.naverblog.map((b, i) => {

                return (

                    <a href={b.link} target="_blank" key={i} className={styles['link']}>
                        <Row className={styles['sns-contents-container']}>
                            <Col>
                                <p className={styles['best-contents']} >
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
                                <p className={styles['best-contents']} >
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
        padding:0,
    };

    return (
        <div className={classNames('container')} style={styleContainer}>
            <Row className="justify-content-md-center">
                <Col sm >
                    <div className={classNames('container', styles['in-container'], styles['auto-container'], styles['naverblog-color'])}>
                        <p className={styles['header-container']}>
                            <img src="/images/ico/blog.png" className={styles['image-ico']}/>&nbsp;농촌진흥청 공식 네이버블로그
                        </p>
                        {blogRss}
                    </div>
                </Col>
                <Col sm>
                    <div className={classNames('container', styles['in-container'], styles['auto-container'], styles['twitter-color'])}>
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