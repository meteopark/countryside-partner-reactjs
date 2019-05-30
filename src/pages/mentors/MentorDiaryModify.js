import React, {Component} from 'react';
import styles from './Mentors.module.scss';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import {Form, Row, Col, Button} from "react-bootstrap";
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import {MentorProfile} from "./MentorProfile";
import {Formik} from "formik";
import * as yup from "yup";
import axios from "axios";
import history from "../history";
import {GlobalsContext} from '../../pages/globals';
import {withRouter} from "react-router";
import {withAlert} from "react-alert";


const schema = yup.object({
    title: yup.string().min(2, '제목을 입력해 주세요.').max(20, '제목을 20자 이하로 넣어주세요').required('제목을 입력해 주세요.'),
    contents: yup.string().required('내용을 입력해 주세요.'),
});

class MentorDiaryModify extends Component {

    constructor(props, context) {

        super(props);
        this.state = {
            apiUserCreate: `${context.server_host}/api/v1/mentors/${this.props.match.params.mentor}/diary`,
            isLoading: false,
            firstView: true,
            schemaDefaultValue: {
                title: '',
                contents: '',
                image: '',
            }
        }
    }

    handleText = (e, type = 'text') => {
        const schemaDefaultValue = {...this.state.schemaDefaultValue};

        if (type === "text") {

            schemaDefaultValue[e.target.name] = e.target.value;

        } else {

            schemaDefaultValue[e.target.name] = e.target.files[0];
        }

        this.setState({schemaDefaultValue})
    }
    handleClick = () => {

        this.setState({isLoading: true}, () => {
            return new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
                this.setState({isLoading: false});
            });
        });
        this.handleDiaryCreate();
    }
    goBack = () =>{
        this.props.history.goBack();
    }

    handleDiaryCreate = () => {

        let formData = new FormData();
        formData.append('title', this.state.schemaDefaultValue.title);
        formData.append('image', this.state.schemaDefaultValue.image);
        formData.append('contents', this.state.schemaDefaultValue.contents);

        let config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        console.log("axiso", formData);
        return axios.post(`${this.state.apiUserCreate}`, formData, config)
            .then(response => {

                this.props.alert.show('등록 되었습니다.');
                history.push(`/mentors/${this.props.match.params.mentor}`);
            })
            .catch(error => {
                console.log("error", error);
            });
    }

    render() {

        const {mapStateToPropsMentor} = this.props;

        return (

            <div>
                {/*<MentorProfile mentor={mapStateToPropsMentor}/>*/}

                <div className={classNames('container', styles['blog-container'])}>

                    <div className={styles['blog-header']}>
                        <reactIconFa.FaPenNib className={styles['main-icon']}/>
                        영농일지 수정
                    </div>
                    <br/>


                    <Formik
                        onSubmit={(values, actions) => {
                            this.handleClick()
                        }}
                        enableReinitialize={true}
                        validationSchema={schema}
                        initialValues={this.state.schemaDefaultValue}
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
                                        value={this.state.schemaDefaultValue.title}
                                        onChange={(e) => this.handleText(e)}
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
                                        value={this.state.schemaDefaultValue.contents}
                                        onChange={(e) => this.handleText(e)}
                                        isInvalid={!!errors.contents}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.contents}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="image">
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        onChange={(e) => this.handleText(e, 'file')}
                                    />
                                    <small className="text-muted">이미지 파일만 업로드 가능합니다 (jpg, png)</small>
                                </Form.Group>


                                <Row>
                                    <Col className={classNames("text-center", styles['end-button-top'])}>
                                        <hr/>
                                        <Button
                                            variant="dark"
                                            type="submit"
                                            disabled={this.state.isLoading}
                                            onClick={!this.state.isLoading ? handleSubmit : null}

                                        >
                                            {this.state.isLoading ? '처리 중' : '등록'}
                                        </Button>
                                        &nbsp;&nbsp;&nbsp;
                                        <Button variant="info" onClick={this.goBack}>취소</Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}/>
                </div>
            </div>
        );
    }

    componentDidMount() {

        const {actionMentor, match} = this.props;
        actionMentor.getDiary(match.params.diary_id);
    }

    // 이 메소드는 컴포넌트 초기화 또는 새로운 props를 받았을 때 일어납니다
    static getDerivedStateFromProps(nextProps, prevState) {

        if (prevState.firstView && nextProps.mapStateToPropsDiary.diary[0]) {

            return {
                firstView: false,
                schemaDefaultValue: {
                    title: nextProps.mapStateToPropsDiary.diary[0].title,
                    contents: nextProps.mapStateToPropsDiary.diary[0].contents,
                    image: '',
                }
            }
        }

        return null;
    }

}

const mapStateToProps = (state) => ({

    mapStateToPropsMentor: state.mentor.mentor,
    mapStateToPropsDiary: state.diary
})

const mapDispatchToProps = (dispatch) => ({

    actionMentor: bindActionCreators(importActions, dispatch),
})

MentorDiaryModify.contextType = GlobalsContext;

export default withRouter(compose(withAlert(), connect(mapStateToProps, mapDispatchToProps))(MentorDiaryModify));