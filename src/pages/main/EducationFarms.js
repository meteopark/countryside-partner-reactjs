import React, {useEffect, useState} from 'react';
import {Row, Col, Image, Card, Badge, CardColumns} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styles from './Main.module.scss';
import classNames from 'classnames';
import * as reactIconFa from "react-icons/fa";
import API from "../api/api";


export function EducationFarms() {

    const [educationFarms, setEducationFarms] = useState([]);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        const randomPage = Math.floor(Math.random() * 15) + 1;{} // 1 ~ 15
        getEducationFarms(randomPage, '', '');

    }, []);

    const getEducationFarms = (page, sType, sText) => {

        API.getOpenApiEducationFarms(page, sType, sText).then((res) => {

            let farms = res.data.map((f, i) => {

                if (i > 7) {
                    return false;
                }
                return (

                        <Card key={i}>
                            {/*<Link className={styles['link']} to={`/mentors/${mentors.mentor_srl}`}>*/}
                            <div className={styles['image-container']}>
                                <Card.Img variant="top" className={styles['image-blank']}
                                          src={f.imgUrl ? f.imgUrl : '/images/no-image.png'}/>
                                <Badge variant="success" className={styles['title']}>{f.cntntsSj.substr(0, 15)}</Badge>
                                <Badge variant="dark" className={styles['sub-title']}>{f.adstrdName}</Badge>
                            </div>
                            {/*</Link>*/}
                        </Card>
                );

            });
            setEducationFarms(farms);
        });
    }

    return (
        <div className={classNames('container', styles['in-container'])}>
            <p className={styles['header-container']}>
                <reactIconFa.FaUserGraduate className={styles['main-icon']}/>
                전국 농촌 교육 농장
            </p>
            <CardColumns>{educationFarms}</CardColumns>
        </div>
    )
}