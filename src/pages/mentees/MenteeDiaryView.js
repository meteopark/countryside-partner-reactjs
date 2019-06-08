import React, {Component} from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import axios from "axios";
import history from "../history";
import {GlobalsContext} from '../../pages/globals';
import {withRouter} from "react-router";
import {withAlert} from "react-alert";
import Diary from "../diaries/Diary";
import {MenteeProfile} from "./MenteeProfile";



class MenteeDiaryView extends Component {

    constructor(props, context) {

        super(props);
        this.state = {
            apiMenteeDiary: `${context.server_host}/api/v1/mentees/${this.props.match.params.mentor}/diaries`,
            isLoading: false,
            schemaDefaultValue: {
                title: '',
                image: '',
                contents: '',
            }
        }
    }

    handleClick = () => {

        this.setState({isLoading: true}, () => {
            return new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
                this.setState({isLoading: false});
                this.handleDiaryCreate();
            });
        });
    }

    handleDiaries = () => {

        history.push(`/mentees/${localStorage.getItem('srl')}`);
    }
    handleDiaryModify = (diary_srl) => {

        history.push(`/mentees/${localStorage.getItem('srl')}/diaries/${diary_srl}/modify`);
    }
    handleDiaryDelete = (diary_srl) => {

        let formData = new FormData();
        formData.append('_method', 'DELETE');
        formData.append('diary_srl', diary_srl);
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        return axios.post(`${this.state.apiMenteeDiary}/${diary_srl}`, formData, config)
            .then(response => {
                this.props.alert.show('삭제 되었습니다.');
                history.push(`/mentees/${this.props.match.params.mentee}`);
            })
            .catch(error => {
                console.log("error", error);
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
                history.push(`/mentees/${this.props.match.params.mentor}`);
            })
            .catch(error => {
                console.log("error", error);
            });
    }

    render() {

        return (

            <div>
                <MenteeProfile mentee={this.props.mapStateToPropsMentee}/>
                <Diary
                    handleDiaries={() => this.handleDiaries()}
                    handleDiaryDelete={(diary_srl) => this.handleDiaryDelete(diary_srl)}
                    handleDiaryModify={(diary_srl) => this.handleDiaryModify(diary_srl)}
                    diary={this.props.mapStateToPropsDiary.diary}
                />
            </div>
        );
    }

    componentDidMount() {

        const {actionMentee, match} = this.props;
        actionMentee.getMentee(match.params.mentee);
        actionMentee.getMenteeDiary(match.params.mentee, match.params.diary_id);
    }

}

const mapStateToProps = (state) => ({

    mapStateToPropsMentee: state.mentee.mentee,
    mapStateToPropsDiary: state.diary

})

const mapDispatchToProps = (dispatch) => ({

    actionMentee: bindActionCreators(importActions, dispatch),
})

MenteeDiaryView.contextType = GlobalsContext;
export default withRouter(compose(withAlert(), connect(mapStateToProps, mapDispatchToProps))(MenteeDiaryView));