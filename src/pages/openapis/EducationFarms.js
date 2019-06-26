import React, {useState, useEffect} from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import * as importActionsOpenApi from '../../actions/openapi';
import styles from './OpenApis.module.scss';
import {Col, Button, Form, Table, Spinner, Modal, Card, Badge, CardColumns} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import API from "../api/api";
import {Link} from "react-router-dom";

export function EducationFarms() {

    const [educationFarms, setEducationFarms] = useState([]);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        getEducationFarms(1, "", "");
        getEducationFarms(2, "", "");

    }, []);

    const handleModal2 = () => {
alert("@");
    }


    const getEducationFarms = (page, sType, sText) => {

        API.getOpenApiEducationFarms(page, sType, sText).then((res) => {

            let farms = res.data.map((f, i) => {

                return (

                    <Card key={i} onClick={handleModal2} >
                        <Card.Img variant="top" src={f.imgUrl ? f.imgUrl : '/images/no-image.png'} />
                        <Card.Body>
                            <Card.Title className={styles['card-title']}>{f.cntntsSj}</Card.Title>
                            <Card.Text className={styles['card-text']}>
                                {f.locplc}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">{f.thema}</small>
                        </Card.Footer>
                    </Card>
                );
            });
            setEducationFarms(best => best.concat(farms));
        });
    }

        return (

            <div className={classNames('container', styles['in-container'])}>


                <p className={styles['header-container']}>
                    <reactIconFa.FaUserGraduate className={styles['main-icon']}/>
                    전국 농촌 교육농장
                </p>
                {/*<Form.Row>*/}
                {/*    <Col sm={2}>*/}
                {/*        <Form.Control name="sidonm" as="select" onChange={this.handleChange}>*/}
                {/*            {areas.map((area, i) => (*/}
                {/*                <option key={i} value={area}>{area}</option>*/}
                {/*            ))}*/}
                {/*        </Form.Control>*/}
                {/*    </Col>*/}
                {/*    <Col sm={2}>*/}
                {/*        <Form.Control name="dealtypecd" as="select" onChange={this.handleChange}>*/}
                {/*            {deal_type.map((deal, i) => (*/}
                {/*                <option key={i} value={deal[0]}>{deal[1]}</option>*/}
                {/*            ))}*/}
                {/*        </Form.Control>*/}
                {/*    </Col>*/}
                {/*    <Col sm={2}>*/}
                {/*        <Form.Control name="gubuncd" as="select" onChange={this.handleChange}>*/}
                {/*            {house_type.map((house, i) => (*/}
                {/*                <option key={i} value={house[0]}>{house[1]}</option>*/}
                {/*            ))}*/}
                {/*        </Form.Control>*/}
                {/*    </Col>*/}
                {/*    &nbsp;&nbsp;*/}
                {/*    <Button variant="secondary" onClick={this.handleSearch}>*/}
                {/*        <reactIconFa.FaSearch className={styles['icons']}/>*/}
                {/*        조회*/}
                {/*    </Button>*/}
                {/*    {this.state.loading === true ?*/}
                {/*        <Spinner*/}
                {/*            className={styles['custom-spinner']}*/}
                {/*            animation="grow"*/}
                {/*            variant="danger"*/}
                {/*        />*/}
                {/*        : ""*/}
                {/*    }*/}
                {/*</Form.Row>*/}
                <p className={styles['source']}>농촌진흥청 공공데이터포털 OpenAPI (농촌 교육농장)</p>
                <CardColumns>{educationFarms}</CardColumns>


            </div>
        );
}