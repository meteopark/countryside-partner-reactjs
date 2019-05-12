import React, {Component} from 'react';

import styles from './User.module.scss';
import classNames from "classnames";
import DaumPostcode from 'react-daum-postcode';
import {Formik} from "formik";
import * as yup from 'yup';
import {Form, Row, Col, Button, InputGroup} from "react-bootstrap";
import axios from 'axios';
import { withAlert } from 'react-alert'
import history from '../history';

class SelectJoin extends Component {

    constructor(props) {

        super(props);
        this.state = {
            test: '',
            daumPostOpen: false,
        }
    }




    handleUserCreate = () => {
    }


    render() {


        return (


            <div className={classNames('container', styles['in-container'])}>

                <div>멘토 가입</div>
                <div>멘티 가입</div>
            </div>


        )
    }
}

export default SelectJoin
