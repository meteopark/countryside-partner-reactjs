import React, {useState, useEffect} from 'react';
import styles from './OpenApis.module.scss';
import {Col, Button, Form, Spinner, Card, CardColumns} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import API from "../api/api";
import {Link} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export function EducationFarms() {

    const [educationFarms, setEducationFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState('');
    const [inputSelect, setInputSelect] = useState('sLocplc');
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        if (loading) {
            getEducationFarms(currentPage, inputSelect, inputText);
            setLoading(false);
        }
    }, [loading, currentPage]);

    const getEducationFarms = (page, sType, sText) => {

        API.getOpenApiEducationFarms(page, sType, sText).then((res) => {

            if (currentPage < 2) setEducationFarms([]);
            setTotalCount(res.totalCount);
            let farms = res.data.map((farm) => {

                return (

                    <Link to={`/educationFarms/${farm.cntntsNo}`} className={classNames(styles['link'])}
                          key={farm.cntntsNo}>
                        <Card>
                            <Card.Img variant="top" src={farm.imgUrl ? farm.imgUrl : '/images/no-image.png'}
                                      className={styles['card-image']}/>
                            <Card.Body className={styles['card-body']}>
                                <small style={{color:'#2F9D27'}}>{farm.thema.substr(0, 16)}{farm.thema.length > 16 ? '...' : ''}</small>
                                <Card.Title className={styles['card-title']}>{farm.cntntsSj}</Card.Title>
                                <Card.Text className={styles['card-text']}>
                                    {farm.locplc}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                );
            });
            setEducationFarms(eduFarm => eduFarm.concat(farms));

            if(currentPage === 1) loadItems();

        });
    }

    const loadItems = () => {

        if (totalCount >= educationFarms.length) {
            setCurrentPage(currentPage + 1);
            setLoading(true);

        } else {
            setLoading(false);
        }
    }

    const search = () => {

        setCurrentPage(1);
        setLoading(true);
    }

    return (

        <div className={classNames('container', styles['in-container'])}>
            <p className={styles['header-container']}>
                <reactIconFa.FaUserGraduate className={styles['main-icon']}/>
                전국 농촌 교육농장
            </p>
            <Form.Row>
                <Col sm={2}>
                    <Form.Control name="sType" as="select" onChange={e => setInputSelect(e.target.value)}>
                        <option value="sLocplc">지역명</option>
                        <option value="sCntntsSj">제목명</option>
                        <option value="sThema">주제명</option>
                    </Form.Control>
                </Col>
                <Col sm={2}>
                    <Form.Control
                        type="text"
                        name="sText"
                        onChange={e => setInputText(e.target.value)}
                    />
                </Col>

                &nbsp;&nbsp;
                <Button variant="secondary" onClick={() => search()}>
                    <reactIconFa.FaSearch className={styles['icons']}/>
                    조회
                </Button>
                {loading ?
                    <Spinner
                        className={styles['custom-spinner']}
                        animation="grow"
                        variant="danger"
                    />
                    : ""
                }
            </Form.Row>
            <p className={styles['source']}>농촌진흥청 공공데이터포털 OpenAPI (농촌 교육농장)</p>
            <hr/>
            {
                educationFarms.length > 0 ?
                        <InfiniteScroll
                            dataLength={educationFarms.length}
                            next={loadItems}
                            hasMore={totalCount > educationFarms.length ? true : false}
                            loader={<div><br/>
                                <div className={classNames("text-center", styles['infinite-loader'])}><Spinner
                                    animation="border" variant="success"/></div>
                                <br/></div>}
                            endMessage={
                                <div className="text-center">
                                    <img src="/images/ico/homi.png" className={styles['homi']}/>
                                </div>
                            }
                        >

                            <CardColumns>{educationFarms}</CardColumns>
                        </InfiniteScroll>

                    :
                    <div className={styles['empty-content']}>교육농장이 존재하지 않습니다.</div>
            }
        </div>
    );
}