import React, {Component} from 'react';

import styles from '../join/Join.module.scss';
import classNames from "classnames";
import DaumPostcode from 'react-daum-postcode';
import {Formik} from "formik";
import * as yup from 'yup';
import {Form, Row, Col, Button, InputGroup} from "react-bootstrap";
import axios from 'axios';
import { withAlert } from 'react-alert'
import history from '../history';
import {GlobalsContext} from '../../pages/globals';
import * as importActions from "../../actions";
import {bindActionCreators, compose} from 'redux';
import {connect} from "react-redux";

const schema = yup.object({
    id: yup.string().min(5, '아이디를 5자 이상 넣어 주세요.').max(20, '아이디를 20자 이하로 넣어주세요').required('아이디를 입력해 주세요.'),
    name: yup.string().required('이름을 입력해 주세요.'),
    birthday: yup.string().required('생년월일 입력해 주세요.'),
    sex: yup.string().required('성별을 선택해 주세요.'),
});


class MyPageEditMentee extends Component {

    constructor(props, context) {

        super(props);
        this.state = {
            apiUserUpdate: context.server_host + '/api/v1/users',
            isLoading: false,
            daumPostOpen: false,
            isNew: false,
            schemaDefaultValue : {
                id: '',
                profile_image: '',
                name: '',
                birthday: '',
                sex: '',
                phone: '',
                address: '',
                farm_name: '',
                career: '',
                introduce: '',
                crops: '',
            }
        }
    }

    handleDaumPost = () => {
        this.state.daumPostOpen ? this.setState({daumPostOpen: false}) : this.setState({daumPostOpen: true});
    }

    handleAddress = (data) => {

        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        this.handleDaumPost();

        this.setState(prevState => ({
            ...prevState,
            schemaDefaultValue: {
                ...prevState.schemaDefaultValue,
                address: fullAddress
            }
        }));
    }

    handleText = (e, type = 'text') => {
        const schemaDefaultValue = {...this.state.schemaDefaultValue};

        if(type === "text"){

            schemaDefaultValue[e.target.name] = e.target.value;
        }else{

            schemaDefaultValue[e.target.name] = e.target.files[0];
        }

        this.setState({schemaDefaultValue})
    }


    handleClick = () => {

        this.setState({ isLoading: true }, () => {
            return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
                this.handleUserUpdate();
            });
        });

    }


    handleUserUpdate = () => {

        let formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('id', this.state.schemaDefaultValue.id);
        formData.append('profile_image', this.state.schemaDefaultValue.profile_image);
        formData.append('name', this.state.schemaDefaultValue.name);
        formData.append('birthday', this.state.schemaDefaultValue.birthday);
        formData.append('sex', this.state.schemaDefaultValue.sex);
        formData.append('phone', this.state.schemaDefaultValue.phone);
        formData.append('address', this.state.schemaDefaultValue.address);
        formData.append('farm_name', this.state.schemaDefaultValue.farm_name);
        formData.append('career', this.state.schemaDefaultValue.career);
        formData.append('introduce', this.state.schemaDefaultValue.introduce);
        formData.append('crops', this.state.schemaDefaultValue.crops);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        return axios.post(`${this.state.apiUserUpdate}`, formData, config)
            .then(response => {

                this.props.alert.show('수정 되었습니다.');
                history.push("/mypage");
            })
            .catch(error => {
                console.log("error", error);
            });
    }

    render() {

        return (
            <div className={classNames('container', styles['in-container'])}>
                <div className={styles['user-create-container']}>
                    <h3>회원정보수정</h3>
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



                                <Row>
                                    <Col className={classNames("text-center", styles['end-button-top'])}>
                                        <hr/>
                                        <Button
                                            variant="warning"
                                            type="submit"
                                            disabled={this.state.isLoading}
                                            onClick={!this.state.isLoading ? handleSubmit : null}

                                        >
                                            {this.state.isLoading ? '처리 중' : '정보변경'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}/>
                </div>
            </div>


        )
    }

    componentDidMount() {
        this.props.actionMentor.getUserInfo();
    }

    // 이 메소드는 컴포넌트 초기화 또는 새로운 props를 받았을 때 일어납니다
    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.mapStateToPropsMentor.id !== prevState.schemaDefaultValue.id) {

            let mentor = nextProps.mapStateToPropsMentor;

            return {
                schemaDefaultValue: {
                    id: mentor.id,
                    profile_image: mentor.profile_image,
                    name: mentor.name,
                    birthday: mentor.birthday,
                    sex: mentor.sex,
                    phone: mentor.phone,
                    address: mentor.address,
                    farm_name: mentor.farm_name,
                    career: mentor.career,
                    introduce: mentor.introduce,
                    crops: mentor.crops,
                }
            };
        }

        return null;
    }
}

MyPageEditMentee.contextType = GlobalsContext;

const mapStateToProps = (state) => ({
    mapStateToPropsMentor: state.mentor.mentor,
})

const mapDispatchToProps = (dispatch) => ({
    actionMentor: bindActionCreators(importActions, dispatch),
})
export default compose(withAlert(),connect(mapStateToProps, mapDispatchToProps))(MyPageEditMentee);


