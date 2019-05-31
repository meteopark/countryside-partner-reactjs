import React, {Component} from 'react';
import styles from './Mentors.module.scss';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import {Form, Row, Col, Button, Image} from "react-bootstrap";
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
import {Link} from "react-router-dom";
import Diary from "../diaries/Diary";


const schema = yup.object({
    title: yup.string().min(2, '제목을 입력해 주세요.').max(20, '제목을 20자 이하로 넣어주세요').required('제목을 입력해 주세요.'),
    contents: yup.string().required('내용을 입력해 주세요.'),
});

class MentorDiaryView extends Component {

    constructor(props, context) {

        super(props);
        this.state = {
            apiUserCreate: `${context.server_host}/api/v1/mentors/${this.props.match.params.mentor}/diaries`,
            isLoading: false,
            schemaDefaultValue: {
                title: '',
                image: '',
                contents: '',
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
                this.handleDiaryCreate();
            });
        });
    }


    handleDiaryCreate = () => {

        let formData = new FormData();
        formData.append('title', this.state.schemaDefaultValue.title);
        formData.append('contents', this.state.schemaDefaultValue.contents);
        formData.append('image', this.state.schemaDefaultValue.image);

        let config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

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

        const {mapStateToPropsMentor, mapStateToPropsDiary} = this.props;

        return (

            <div>
                <MentorProfile mentor={mapStateToPropsMentor}/>
                <Diary
                    diary={mapStateToPropsDiary.diary}
                />
            </div>
        );
    }

    componentDidMount() {

        const {actionMentor, match} = this.props;
        actionMentor.getMentor(match.params.mentor);
        actionMentor.getDiary(match.params.diary_id);
    }

}

const mapStateToProps = (state) => ({

    mapStateToPropsMentor: state.mentor.mentor,
    mapStateToPropsDiary: state.diary

})

const mapDispatchToProps = (dispatch) => ({

    actionMentor: bindActionCreators(importActions, dispatch),
})

export default withRouter(compose(withAlert(), connect(mapStateToProps, mapDispatchToProps))(MentorDiaryView));