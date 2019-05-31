import React, {Component} from 'react';
import styles from './Diary.module.scss';
import {Form, Row, Col, Button, Image} from "react-bootstrap";
import classNames from "classnames";
import {Formik} from "formik";
import {withRouter} from "react-router";
import {withAlert} from "react-alert";

class DiaryModify extends Component {

    render() {

        const {
            schema,
            schemaDefaultValue
        } = this.props;

        return (

            <div>
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