import React, {Component} from 'react';

import styles from './Join.module.scss';
import {Formik} from "formik";
import * as yup from 'yup';
import {Form, Button} from "react-bootstrap";
import axios from 'axios';
import history from '../history';
import {Link, withRouter} from "react-router-dom";
import {GlobalsContext} from "../globals";
import {withAlert} from "react-alert";
import {connect} from "react-redux";
import * as importActions from "../../actions";
import {bindActionCreators, compose} from "redux";

const schema = yup.object({
    id: yup.string().required('아이디를 입력해 주세요.'),
    password: yup.string().required('비밀번호를 입력해 주세요.'),
});


class Login extends Component {

    constructor(props, context) {

        super(props);
        this.state = {
            apiLogin: context.server_host + '/api/v1/login',
            isLoading: false,
            schemaDefaultValue : {
                id: 'Bot-1559031271832',
                password: '1111',
                is_mentor: false,
            }
        }
    }

    handleForm = (e, type = 'text') => {
        const schemaDefaultValue = {...this.state.schemaDefaultValue};

        if(type === "text"){

            schemaDefaultValue[e.target.name] = e.target.value;
        } else if(type === "checked") {

            schemaDefaultValue[e.target.name] = e.target.checked;
        }

        this.setState({schemaDefaultValue})
    }


    handleClick = () => {

        this.setState({ isLoading: true }, () => {
            return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
                this.handleUserLogin();
            });
        });

    }


    handleUserLogin = () => {

        let formData = new FormData();
        formData.append('id', this.state.schemaDefaultValue.id);
        formData.append('password', this.state.schemaDefaultValue.password);
        formData.append('is_mentor', this.state.schemaDefaultValue.is_mentor);

        return axios.post(`${this.state.apiLogin}`, formData)
                .then(response => {

                    if (response.data.stat === 0) {

                        this.props.alert.show(response.data.error.message);

                    } else {

                        const res = response.data;
                        this.props.actions.isLogged(true);
                        this.props.alert.show('로그인 되었습니다.');
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('name', res.name);
                        localStorage.setItem('user_type', res.user_type);
                        localStorage.setItem('srl', res.srl);
                        history.push("/");
                    }

                })
                .catch(error => {
                    console.log("error", error);
                });
    }


    render() {

        return (


            <div className='container'>
                <div className={styles['login-container']}>
                    <div className={styles['login-form']}>
                <Formik
                    onSubmit={(values, actions) => {
                        this.handleClick()
                    }}
                    enableReinitialize={true}
                    validationSchema={schema}
                    initialValues={this.state.schemaDefaultValue}
                    render={({
                                 handleSubmit,
                                 handleChange,
                                 handleBlur,
                                 values,
                                 errors
                             }) => (

                        <Form
                            className="needs-validation"
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <h3>로그인</h3>
                            <hr/>
                            <Form.Group controlId="id">
                                <Form.Control
                                    type="text"
                                    name="id"
                                    placeholder="아이디"
                                    onChange={(e) => this.handleForm(e, 'text')}
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="바밀번호"
                                    onChange={(e) => this.handleForm(e, 'text')}
                                />
                            </Form.Group>
                            <Form.Group controlId="is_mentor">
                                <Form.Check
                                    name="is_mentor"
                                    type="checkbox"
                                    label="멘토일 경우 체크해 주세요."
                                    onChange={(e) => this.handleForm(e, 'checked')}
                                />
                            </Form.Group>
                            <hr/>
                            <Button
                                variant="dark"
                                type="submit"
                                disabled={this.state.isLoading}
                                onClick={!this.state.isLoading ? handleSubmit : null}
                            >
                                {this.state.isLoading ? '처리 중' : '로그인'}
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Link to={"/join"}><Button variant="outline-dark" type="button">회원가입</Button>
                            </Link>
                        </Form>
                    )}/>
                    </div>
                </div>
            </div>


        )
    }
}

Login.contextType = GlobalsContext;

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(importActions, dispatch),
});
export default withRouter(compose(withAlert(), connect(null, mapDispatchToProps))(Login));
