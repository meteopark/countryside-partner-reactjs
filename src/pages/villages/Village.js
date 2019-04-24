import React, {Component} from 'react';
import styles from './Village.module.scss';

import {Carousel, Row, Col, Tabs, Tab} from "react-bootstrap";
import classNames from "classnames";

class Village extends Component {


    render() {

        return (

            <div>


                <div className={classNames('container', styles['in-container'])}>
                    <Row>
                        <Col><h2>익산 산들강웅포마을 (뱃지 넣어야 함 Pill )</h2></Col>
                    </Row>
                    <Row>
                        <Col xs={7}>

                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        height="300px"
                                        className="d-block w-100"
                                        src="http://www.welchon.com/upload/2013/05/18/79869481845947687247_thumbnail1.jpg"
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        height="300px"
                                        className="d-block w-100"
                                        src="http://www.welchon.com/upload/2013/04/09/79869590845248258632_thumbnail1.jpg"
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={3}><b>소개</b></Col>
                                <Col>깨끗한 물과 아름다운 경관을 자랑하는 곳깨끗한 물과 아름다운 경관을 자랑하는 곳</Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs={3}><b>주소</b></Col>
                                <Col>서울시 영등포구 여의도 736-41</Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs={3}><b>마을 대표자</b></Col>
                                <Col>박유성</Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs={3}><b>대표번호</b></Col>
                                <Col>010-6827-4050</Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs={3}><b>홈페이지</b></Col>
                                <Col>http://blog.meteopark.dev</Col>
                            </Row>
                            <hr/>

                        </Col>
                    </Row>


                    <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                        <Tab eventKey="home" title="마을소개">
                            test1
                        </Tab>
                        <Tab eventKey="profile" title="체험안내">
                            test2
                        </Tab>
                        <Tab eventKey="profile33" title="교통안내">
                            test3
                        </Tab>
                    </Tabs>

                </div>

            </div>


        )
    }
}

export default Village