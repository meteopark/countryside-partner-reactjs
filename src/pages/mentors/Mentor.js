import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import {MentorProfile} from "./MentorProfile";
import Diaries from "../diaries/Diaries";
import API from "../api/api";


class Mentor extends Component {

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

        if (this.state.last_page <= this.state.current_page) this.setState({hasMore: false});
        this.getMentorDiaries(this.props.match.params.mentor, this.state.current_page + 1);
    }

    render() {

        const mentor = this.props.mapStateToPropsMentor;

        return (
            <div>
                <MentorProfile mentor={mentor}/>
                <Diaries
                    hasMore={this.state.hasMore}
                    user={mentor}
                    diaries={this.state.diaries}
                    loadItems={this.loadItems}
                />
            </div>
        );
    }

    componentDidMount() {
        const {actionMentor, match} = this.props;
        actionMentor.getMentor(match.params.mentor);
        this.getMentorDiaries(match.params.mentor, 1);
    }

    getMentorDiaries = async (mentor, page) => {

        const res = await API.getMentorDiaries(mentor, page);

        this.setState({
            diaries: this.state.diaries.concat(res.data),
            current_page: res.current_page,
            last_page: res.last_page,
        });
    }

}

const mapStateToProps = (state) => ({
    mapStateToPropsMentor: state.mentor.mentor,
})

const mapDispatchToProps = (dispatch) => ({
    actionMentor: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentor);