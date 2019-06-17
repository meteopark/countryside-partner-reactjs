import React, {Component} from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import {MentorProfile} from "./MentorProfile";
import axios from "axios";
import history from "../history";
import {GlobalsContext} from '../../pages/globals';
import {withRouter} from "react-router";
import {withAlert} from "react-alert";
import DiaryCreate from "../diaries/DiaryCreate";

class MentorDiaryCreate extends Component {

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

    handleChange = (e, type = 'text') => {
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

    goBack = () =>{

        this.props.history.goBack();
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

        const mentor = this.props.mapStateToPropsMentor;

        return (

            <div>
                <MentorProfile mentor={mentor}/>
                <DiaryCreate
                    schemaDefaultValue={this.state.schemaDefaultValue}
                    isLoading={this.state.isLoading}
                    goBack={this.goBack}
                    handleClick={this.handleClick}
                    handleChange={(e, type) => this.handleChange(e, type)}
                />
            </div>
        );
    }

    componentDidMount() {

        const {actionMentor, match} = this.props;
        actionMentor.getMentor(match.params.mentor);
    }

}

const mapStateToProps = (state) => ({

    mapStateToPropsMentor: state.mentor.mentor,
})

const mapDispatchToProps = (dispatch) => ({

    actionMentor: bindActionCreators(importActions, dispatch),
})

MentorDiaryCreate.contextType = GlobalsContext;

export default withRouter(compose(withAlert(), connect(mapStateToProps, mapDispatchToProps))(MentorDiaryCreate));