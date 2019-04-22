import React, {Component} from 'react';
import {Header} from "../inc/Header";
import Footer from "../inc/Footer";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from './Main.module.scss';

// inc main
import SideNav from "../inc/SideNav";
import VillageVisit from "./VillageVisit";
import {ControlledCarousel} from "./ControlledCarousel";




class Main extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        const { mains } = this.props;

        return (

            <div>
                <Header />

                <div className={styles['full-container']}>


                    <SideNav />
                    <hr/>

                    <ControlledCarousel/>
                    <br/>
                    <VillageVisit />
                    <br/>

                </div>

                <Footer />
            </div>

        );
    }
// <ControlledCarousel/>
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
