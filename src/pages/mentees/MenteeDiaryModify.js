import React, {Component} from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import {MenteeProfile} from "./MenteeProfile";
import axios from "axios";
import history from "../history";
import {GlobalsContext} from '../../pages/globals';
import {withAlert} from "react-alert";
import DiaryModify from "../diaries/DiaryModify";


class MenteeDiaryModify extends Component {

    constructor(props, context) {

        super(props);
        this.state = {
            apiUpdateDiary: `${context.server_host}/api/v1/mentees/${this.props.match.params.mentee}/diaries/${this.props.match.params.diary_id}`,
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

        } else if (type === "image") {

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

    goBack = () => {
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
                    history.push(`/mentees/${this.props.match.params.mentee}`);
                }

            })
            .catch(error => {
                console.log("error", error);
            });
    }

    render() {

        const {mapStateToPropsMentee} = this.props;

        return (

            <div>
                <MenteeProfile mentee={mapStateToPropsMentee}/>

                <DiaryModify
                    schemaDefaultValue={this.state.schemaDefaultValue}
                    isLoading={this.state.isLoading}
                    hasImage={this.state.hasImage}
                    goBack={this.goBack}
                    handleClick={this.handleClick}
                    handleCheckbox={(e) => this.handleCheckbox(e)}
                    handleChange={(e, type) => this.handleChange(e, type)}
                />
            </div>
        );
    }

    componentDidMount() {
        const {actionMentee, match} = this.props;
        actionMentee.getMentee(match.params.mentee);
        actionMentee.getDiary(match.params.diary_id);
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
    mapStateToPropsMentee: state.mentee.mentee,
    mapStateToPropsDiary: state.diary
})

const mapDispatchToProps = (dispatch) => ({
    actionMentee: bindActionCreators(importActions, dispatch),
})

MenteeDiaryModify.contextType = GlobalsContext;

export default compose(withAlert(), connect(mapStateToProps, mapDispatchToProps))(MenteeDiaryModify);