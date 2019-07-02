import React, {Component} from 'react';
import styles from './Diary.module.scss';
import {Form, Row, Col, Button, Image} from "react-bootstrap";
import classNames from "classnames";
import {Formik} from "formik";
import {withRouter} from "react-router";
import {withAlert} from "react-alert";
import * as yup from "yup";
import * as reactIconFa from "react-icons/fa";

const schema = yup.object({
    title: yup.string().min(2, '제목을 입력해 주세요.').max(40, '제목을 40자 이하로 넣어주세요').required('제목을 입력해 주세요.'),
    contents: yup.string().required('내용을 입력해 주세요.'),
});

class DiaryModify extends Component {

    render() {

        const {schemaDefaultValue} = this.props;

        return (

            <div className={classNames('container', styles['blog-container'])}>

                <div className={styles['blog-header']}>
                    <reactIconFa.FaPenNib className={styles['main-icon']}/>
                    영농일지 수정
                </div>
                <br/>

                <Formik
                    onSubmit={(values, actions) => {
                        this.props.handleClick()
                    }}
                    enableReinitialize={true}
                    validationSchema={schema}
                    initialValues={schemaDefaultValue}
                    render={({
                                 handleSubmit,
                                 errors
                             }) => (

                        <Form
                            className="needs-validation"
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <Form.Group controlId="title">
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="title"
                                    placeholder="제목을 입력하세요"
                                    value={schemaDefaultValue.title}
                                    onChange={(e) => this.props.handleChange(e, 'text')}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="contents">
                                <Form.Control
                                    as="textarea"
                                    name="contents"
                                    placeholder="내용을 입력하세요"
                                    rows="10"
                                    value={schemaDefaultValue.contents}
                                    onChange={(e) => this.props.handleChange(e, 'text')}
                                    isInvalid={!!errors.contents}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.contents}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {
                                this.props.hasImage !== '' ?
                                    <Form.Group controlId="formBasicChecbox">
                                        <Form.Check
                                            type="checkbox"
                                            label="이미지 삭제"
                                            onChange={(e) => this.props.handleCheckbox(e)}
                                        />
                                        <Image
                                            src={this.props.hasImage}
                                            className={styles['diary-image']}/>
                                    </Form.Group>
                                    :
                                    ""
                            }
                            <Form.Group controlId="image">
                                <Form.Control
                                    type="file"
                                    name="image"
                                    onChange={(e) => this.props.handleChange(e, 'image')}
                                />
                                <small className="text-muted">이미지 파일만 업로드 가능합니다 (jpg, png)</small>
                            </Form.Group>
                            <Row>
                                <Col className={classNames("text-center", styles['end-button-top'])}>
                                    <hr/>
                                    <Button
                                        variant="dark"
                                        type="submit"
                                        disabled={this.props.isLoading}
                                        onClick={!this.props.isLoading ? handleSubmit : null}
                                    >
                                        {this.props.isLoading ? '처리 중' : '수정'}
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button variant="info" onClick={this.props.goBack}>취소</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}/>
            </div>
        );
    }
}

export default withRouter(withAlert()(DiaryModify));