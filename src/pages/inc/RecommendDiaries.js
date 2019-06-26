import React, {useEffect, useState} from 'react';
import {CardDeck, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import * as reactIconFa from "react-icons/fa";
import API from "../api/api";


export function RecommendDiaries() {

    const [bestDiaries, setBestDiaries] = useState([]);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        getBestDiaries();

    }, []);

    const getBestDiaries = () => {

        API.getBestDiaries().then((res) => {

            let contents = res.map((r, i) => {

                return (
                    <Card key={i}>
                        <Link className={classNames(styles['link'])}
                              to={`/mentors/${r.mentor_srl}/diaries/${r.diary_srl}`} >
                        <Card.Img variant="top" src={r.image === null ? "/images/ico/homi_bg.png" : r.image} className={styles['recommend-image']}/>
                        <Card.Body className={styles['recommend-txt']}>
                            <Card.Title>{r.title.substr(0, 10)}...</Card.Title>
                            <Card.Text className={styles['recommend-txt']}>
                                {r.contents.substr(0, 80)}
                            </Card.Text>
                        </Card.Body>
                        </Link>
                    </Card>
                );
            });
            setBestDiaries(best => best.concat(contents));
        });
    }

    return (
        <div className={classNames('container', styles['in-container'])}>
            <h4><reactIconFa.FaStar className={styles['main-icon']}/>추천 콘텐츠</h4>
            <CardDeck className={styles['recommend-container']}>{bestDiaries}</CardDeck>
        </div>
    )
}