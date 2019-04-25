import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import GosuVisit from "./GosuVisit";
import {ControlledCarousel} from "./ControlledCarousel";


class Main extends Component {

    render() {

        return (

            <div>
                <ControlledCarousel/>
                <br/>
                <GosuVisit />
                <br/>
            </div>
        );
    }

    componentDidMount() {

        const { getMains } = this.props;
        getMains.mainLists();
    }
}

const mapStateToProps = (state) => ({

    mains: state.mains // state.mains 는 reducers/Village.jsjs 의 키값과 같아야 한다
})

const mapDispatchToProps = (dispatch) => ({

    getMains: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
