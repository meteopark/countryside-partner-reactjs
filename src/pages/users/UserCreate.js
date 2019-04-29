import React, {Component} from 'react';

import styles from './UserCreate.module.scss';
import classNames from "classnames";
import DaumPostcode from 'react-daum-postcode';

import {Form, Row, Col, Button, InputGroup} from "react-bootstrap";

class UserCreate extends Component {

    constructor(props) {

        super(props);
        this.state = {
            address: '',
            daumPostOpen: false,

            // form 정보
            id: '',
        }
    }

    handleDaumPost = () => {

        this.state.daumPostOpen ? this.setState({daumPostOpen: false}) : this.setState({daumPostOpen: true});
    }
    handleAddress = (data) => {

        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        this.setState({
            address: fullAddress,
            daumPostOpen: false
        });
    }




    render(
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors
    ) {

        return (

            <div className={classNames('container', styles['in-container'])}>

                {/*CREATE TABLE cp_mentors(*/}
                {/*mentor_srl bigint not null primary key auto_increment,*/}
                {/*profile_image varchar(255), -- 프로필 이미지*/}
                {/*introduce varchar(255) not null, -- 기본소개*/}
                {/*address varchar(255) not null, -- 농장주소*/}
                {/*farm_name varchar(255), -- 소유농장명*/}
                {/*phone varchar(15), -- 연락처*/}
                {/*career varchar(50), -- 업종경력*/}
                {/*crops varchar(50), -- 주요작물*/}
                {/*sex varchar(10), -- 성별 ( male, female )*/}
                {/*birthday varchar(15), -- 생년월일*/}
                {/*regdate varchar(20) not null*/}
                {/*)ENGINE = MyISAM, CHARACTER SET = UTF8;*/}

                <div className={styles['user-create-container']}>
                    <h3>회원가입 - 멘토</h3>
                    <br/>
                    <Form className="needs-validation" noValidate onSubmit={handleSubmit}>
                        <h5>기본정보</h5>
                        <hr/>

                        <Form.Group as={Row} controlId="id">
                            <Form.Label column sm="2">
                                아이디
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    name="id"
                                    onChange={handleChange}
                                    value={values.id}
                                    isValid={!!errors.id}
                                />
                                <Form.Control.Feedback>
                                    {errors.id}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="id">
                            <Form.Label column sm="2">
                                비밀번호
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder=""/>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} controlId="name">
                            <Form.Label column sm="2">
                                이름
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder=""/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="name">
                            <Form.Label column sm="2">
                                생년월일
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Ex : 1984-11-24"/>
                            </Col>
                        </Form.Group>
                        <fieldset>
                            <Form.Group as={Row}>
                                <Form.Label as="sex" column sm={2}>
                                    성별
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        custom
                                        inline
                                        type="radio"
                                        label="남"
                                        name="sex"
                                        id="sex_male"
                                        value="male"
                                    />
                                    <Form.Check
                                        custom
                                        inline
                                        type="radio"
                                        label="여"
                                        name="sex"
                                        id="sex_female"
                                        value="female"
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                        <Form.Group as={Row} controlId="profile_image">
                            <Form.Label column sm="2">
                                프로필 이미지
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="file"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="phone">
                            <Form.Label column sm="2">
                                연락처
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Ex : 010-1234-5678"/>
                            </Col>
                        </Form.Group>

                        <br/><br/>
                        <h5>농장정보</h5>
                        <hr/>
                        <Form.Group as={Row} controlId="address">
                            <Form.Label column sm="2">
                                농장명
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder=""/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="address">
                            <Form.Label column sm="2">
                                농장주소
                            </Form.Label>
                            <Col sm="10">
                                <InputGroup>
                                    <Form.Control type="text" placeholder="" value={this.state.address} readOnly/>
                                    <InputGroup.Append>
                                        <Button variant="outline-dark" onClick={this.handleDaumPost}>주소검색</Button>
                                    </InputGroup.Append>
                                </InputGroup>

                                {
                                    this.state.daumPostOpen ?
                                        <DaumPostcode
                                            onComplete={this.handleAddress}
                                            autoClose={true}
                                        /> : ''
                                }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="phone">
                            <Form.Label column sm="2">
                                업종경력
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select">
                                    <option value="1-3">1년 ~ 3년</option>
                                    <option value="5-9">5년 ~ 9년</option>
                                    <option value="10-14">10년 ~ 14년</option>
                                    <option value="15-0">15년 이상</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="address">
                            <Form.Label column sm="2">
                                주요작물
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select">
                                    <option value="콩">콩</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Row>
                            <Col className={classNames("text-center", styles['end-button-top'])}>
                                <hr/>
                                <Button variant="dark" type="submit">가입하기</Button>
                            </Col>
                        </Row>
                    </Form>

                </div>
            </div>


        )
    }
}

export default UserCreate