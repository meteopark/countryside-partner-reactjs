import React, {Component} from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import axios from "axios";
import history from "../history";
import {GlobalsContext} from '../../pages/globals';
import {withAlert} from "react-alert";
import DiaryCreate from "../diaries/DiaryCreate";
import {MenteeProfile} from "./MenteeProfile";


class MenteeDiaryCreate extends Component {

    constructor(props, context) {

        super(props);
        this.state = {
            apiUserDiaryCreate: `${context.server_host}/api/v1/mentees/${this.props.match.params.mentee}/diaries`,
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

        return axios.post(`${this.state.apiUserDiaryCreate}`, formData, config)
            .then(response => {

                this.props.alert.show('등록 되었습니다.');
                history.push(`/mentees/${this.props.match.params.mentee}`);
            })
            .catch(error => {
                console.log("error", error);
            });
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
    render() {

        const mentee = this.props.mapStateToPropsMentee;

        return (

            <div>
                <MenteeProfile mentee={mentee}/>
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

        const {actionMentee, match} = this.props;
        actionMentee.getMentee(match.params.mentee);
    }

}

const mapStateToProps = (state) => ({

    mapStateToPropsMentee: state.mentee.mentee,
})

const mapDispatchToProps = (dispatch) => ({

    actionMentee: bindActionCreators(importActions, dispatch),
})

MenteeDiaryCreate.contextType = GlobalsContext;

export default compose(withAlert(), connect(mapStateToProps, mapDispatchToProps))(MenteeDiaryCreate);