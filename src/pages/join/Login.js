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
                id: '',
                password: '',
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
            return new Promise(resolve => setTimeout(resolve, 300)).then(() => {
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

                    const res = response.data;

                    if (res.stat === 1) {

                        this.setState({isLoading: false});
                        this.props.alert.show(res.error.message);

                    } else {

                        this.props.actions.isLogged(true, res.srl, res.user_type);
                        localStorage.clear();
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('name', res.name);
                        localStorage.setItem('user_type', res.user_type);
                        localStorage.setItem('srl', res.srl);
                        this.props.alert.show('로그인 되었습니다.');
                        history.push("/");
                    }

                })
                .catch(error => {
                    console.log("error", error);
                    this.setState({isLoading: false});
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
                                    value={this.state.schemaDefaultValue.id}
                                    onChange={(e) => this.handleForm(e, 'text')}
                                    isInvalid={!!errors.id}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.id}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="바밀번호"
                                    value={this.state.schemaDefaultValue.password}
                                    onChange={(e) => this.handleForm(e, 'text')}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
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
