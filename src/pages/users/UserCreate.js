import React, {Component} from 'react';

import styles from './UserCreate.module.scss';
import classNames from "classnames";
import DaumPostcode from 'react-daum-postcode';
import {Formik} from "formik";
import * as yup from 'yup';
import {Form, Row, Col, Button, InputGroup} from "react-bootstrap";



const schema = yup.object({
    id: yup.string().min(5, '아이디를 5자 이상 넣어 주세요.').max(20, '아이디를 20자 이하로 넣어주세요').required(),
    password: yup.string().required(),
    name: yup.string().required(),
    birthday: yup.string().required(),
    sex: yup.string().required('성별을 선택해 주세요.'),
    phone: yup.string().required(),
});
const schemaDefaultValue = {
    id: '',
    password: '',
    name: '',
    birthday: '',
    sex: '',
    phone: '',
};

class UserCreate extends Component {

    constructor(props) {

       super(props);
        this.state = {
            daumPostOpen: false
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
            // form: {
            //     address: fullAddress
            // },
            daumPostOpen: false
        });
    }


    render() {


        // schema: yubObject({
        //     id: yubString().required(),
        //     password: yubString().required(),
        //     name: yubString().required(),
        //     birthday: yubString().required(),
        //     sex: yubString().required(),
        //     phone: yubString().required(),
        //
        // })

        return (

            <div className={classNames('container', styles['in-container'])}>

                <div className={styles['user-create-container']}>
                    <h3>회원가입 - 멘토</h3>
                    <br/>
                    <Formik
                        validationSchema={schema}
                        initialValues={schemaDefaultValue}
                        onSubmit={(values, {setSubmitting}) => {

                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 1000);
                        }}
                        render={({
                                     handleSubmit,
                                     handleChange,
                                     handleBlur,
                                     values,
                                     touched,
                                     isValid,
                                     errors
                                 }) => (

                            <Form
                                className="needs-validation"
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <h5>기본정보</h5>
                                <hr/>

                                <Form.Group as={Row} controlId="id">
                                    <Form.Label column sm="2">아이디</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            name="id"
                                            value={values.id}
                                            onChange={handleChange}
                                            isInvalid={!!errors.id}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.id}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="password">
                                    <Form.Label column sm="2">비밀번호</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>


                                <Form.Group as={Row} controlId="name">
                                    <Form.Label column sm="2">이름</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="birthday">
                                    <Form.Label column sm="2">생년월일</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ex : 1984-11-24"
                                            name="birthday"
                                            value={values.birthday}
                                            onChange={handleChange}
                                            isInvalid={!!errors.birthday}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.birthday}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <fieldset>
                                    <Form.Group as={Row}>
                                        <Form.Label as="sex" column sm={2}>성별</Form.Label>
                                        <Col sm={10}>
                                            <Form.Check
                                                type="text"
                                                id="sex"
                                                value={values.sex}
                                                isInvalid={touched.sex}
                                                feedback={errors.sex}
                                            >
                                            <Form.Check
                                                custom
                                                inline
                                                type="radio"
                                                label="남"
                                                name="sex"
                                                id="sex1"
                                            />
                                            <Form.Check
                                                custom
                                                inline
                                                type="radio"
                                                label="여"
                                                name="sex"
                                                id="sex2"
                                            />
                                            </Form.Check>
                                        </Col>
                                    </Form.Group>
                                </fieldset>
                                <Form.Group as={Row} controlId="profile_image">
                                    <Form.Label column sm="2">프로필 이미지</Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="file" name="profile_image"/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="phone">
                                    <Form.Label column sm="2">연락처</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ex : 1984-11-24"
                                            name="phone"
                                            value={values.phone}
                                            onChange={handleChange}
                                            isInvalid={!!errors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <br/><br/>
                                <h5>농장정보</h5>
                                <hr/>
                                <Form.Group as={Row} controlId="farm_name">
                                    <Form.Label column sm="2">농장명</Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            name="farm_name"
                                            placeholder=""
                                            value={values.farm_name}
                                            readOnly
                                            onChange={handleChange}
                                            isInvalid={!!errors.farm_name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.farm_name}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="address">
                                    <Form.Label column sm="2">농장주소</Form.Label>
                                    <Col sm="10">
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                placeholder=""
                                                value={values.address}
                                                readOnly
                                                onChange={handleChange}
                                                isInvalid={!!errors.address}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.address}
                                            </Form.Control.Feedback>
                                            <InputGroup.Append>
                                                <Button variant="outline-dark"
                                                        onClick={this.handleDaumPost}>주소검색</Button>
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

                                <Form.Group as={Row} controlId="career">
                                    <Form.Label column sm="2">업종경력</Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="select" name="career">
                                            <option value="1-3">1년 ~ 3년</option>
                                            <option value="5-9">5년 ~ 9년</option>
                                            <option value="10-14">10년 ~ 14년</option>
                                            <option value="15-0">15년 이상</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="crops">
                                    <Form.Label column sm="2">주요작물</Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="select" name="crops">
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

                        )}/>


                </div>
            </div>


        )
    }
}

export default UserCreate