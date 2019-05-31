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
import DiaryModify from "../diaries/DiaryModify";


const schema = yup.object({
    title: yup.string().min(2, '제목을 입력해 주세요.').max(20, '제목을 20자 이하로 넣어주세요').required('제목을 입력해 주세요.'),
    contents: yup.string().required('내용을 입력해 주세요.'),
});

class MentorDiaryModify extends Component {

    constructor(props, context) {

        super(props);
        this.state = {
            apiUpdateDiary: `${context.server_host}/api/v1/mentors/${this.props.match.params.mentor}/diaries/${this.props.match.params.diary_id}`,
            isLoading: false,
            firstView: true,
            hasImage: '',
            deleteImage: false,
            schemaDefaultValue: {
                title: '',
                contents: '',
                image: '',
            }
        }
    }

    handleChange = (e, type = 'text') => {
        const schemaDefaultValue = {...this.state.schemaDefaultValue};

        if (type === "text") {

            schemaDefaultValue[e.target.name] = e.target.value;

        } else if(type === "image") {

            schemaDefaultValue[e.target.name] = e.target.files[0];

        }

        this.setState({schemaDefaultValue})
    }

    handleCheckbox = (e) => {

        this.setState({deleteImage: e.target.checked})
    }

    handleClick = () => {

        this.setState({isLoading: true}, () => {
            return new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
                this.setState({isLoading: false});
                this.handleDiaryModify();
            });
        });


    }

    goBack = () =>{
        this.props.history.goBack();
    }

    handleDiaryModify = () => {

        let formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', this.state.schemaDefaultValue.title);
        formData.append('contents', this.state.schemaDefaultValue.contents);
        formData.append('image', this.state.schemaDefaultValue.image);
        formData.append('deleteImage', this.state.deleteImage);

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        console.log(this.state.apiUpdateDiary);
        return axios.post(`${this.state.apiUpdateDiary}`, formData, config)
            .then(response => {

                if (response.status === 200) {
                    this.props.alert.show('등록 되었습니다.');
                    history.push(`/mentors/${this.props.match.params.mentor}`);
                }

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

                    <DiaryModify
                        schema={schema}
                        schemaDefaultValue={this.state.schemaDefaultValue}
                        isLoading={this.state.isLoading}
                        hasImage={this.state.hasImage}
                        onClick={this.goBack}
                        handleClick={this.handleClick}
                        handleCheckbox={(e) => this.handleCheckbox(e)}
                        handleChange={(e, type) => this.handleChange(e, type)}
                    />
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
                },
                hasImage: nextProps.mapStateToPropsDiary.diary[0].image
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