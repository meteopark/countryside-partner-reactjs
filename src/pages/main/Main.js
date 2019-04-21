import React from 'react';
import {Header} from "../inc/Header";
import VillageVisit from "./VillageVisit";
import {ControlledCarousel} from "../inc/ControlledCarousel";
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';


class Main extends React.Component {

    constructor(props) {

        super(props);
    }

    render() {

        const { mains } = this.props;

        return (
            <div>
                <Header />
                <hr/>
                <VillageVisit/>
                <br/>
                <ControlledCarousel/>
            </div>
        );
    }

    componentDidMount() {

        const { getMains } = this.props;
        getMains.mainLists();
    }
}

const mapStateToProps = (state) => ({

    mains: state.mains // state.mains 는 reducers/index.js 의 키값과 같아야 한다
})

const mapDispatchToProps = (dispatch) => ({

    getMains: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
