import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import {withRouter} from "react-router-dom";
import Diaries from "../diaries/Diaries";
import {MenteeProfile} from "./MenteeProfile";
import API from "../api/api";


class Mentee extends Component {

    constructor(props) {

        super(props);
        this.state = {
            hasMore: true,
            diaries: [],
            current_page: 1,
            last_page: 1,
        }
    }

    loadItems = () => {
        if (this.state.last_page === this.state.current_page) this.setState({hasMore: false});
        this.getMenteeDiaries(this.props.match.params.mentee, this.state.current_page + 1);
    }

    render() {

        const mentee = this.props.mapStateToPropsMentee;

        return (

            <div>
                <MenteeProfile mentee={mentee}/>
                <Diaries
                    hasMore={this.state.hasMore}
                    user={mentee}
                    diaries={this.state.diaries}
                    loadItems={this.loadItems}
                />
            </div>
        );
    }

    componentDidMount() {
        const {actionMentee, match} = this.props;
        actionMentee.getMentee(match.params.mentee);
        this.getMenteeDiaries(match.params.mentee, 1);
    }

    getMenteeDiaries = async (mentee, page) => {

        const res = await API.getMenteeDiaries(mentee, page);

        this.setState({
            diaries: this.state.diaries.concat(res.data),
            current_page: res.current_page,
            last_page: res.last_page,
        });
    }

}

const mapStateToProps = (state) => ({
    mapStateToPropsMentee: state.mentee.mentee,
})

const mapDispatchToProps = (dispatch) => ({
    actionMentee: bindActionCreators(importActions, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Mentee));