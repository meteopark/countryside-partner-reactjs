import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from '../mentees/Mentees.module.scss';
import {Link} from 'react-router-dom';
import {CardColumns, Card, Spinner} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

class Mentees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasMore: true
        }
    }

    loadItems = () => {

        const {mentee, getMains} = this.props;
        if (mentee.lists.last_page === mentee.lists.current_page) this.setState({hasMore: false});
        setTimeout(() => {
            getMains.menteeLists(mentee.lists.current_page + 1);
        }, 1000);
    }

    render() {

        const {mentee} = this.props;

        return (

            <div className={classNames('container', styles['in-container'])}>

                <p className={styles['header-container']}>
                    <reactIconFa.FaRegKissWinkHeart className={styles['main-icon']}/>
                    멘티소개
                </p>
                <CardColumns bsPrefix={'card-columns-custom'}>

                    <InfiniteScroll
                        dataLength={mentee.lists.data.length}
                        next={this.loadItems}
                        hasMore={mentee.lists.data.length < 1 ? false : this.state.hasMore}
                        loader={<div><br/>
                            <div className={classNames("text-center", styles['infinite-loader'])}><Spinner
                                animation="border" variant="success"/></div>
                            <br/></div>}
                        endMessage={
                            <div className="text-center">
                                <img src="/images/ico/homi.png" className={styles['homi']}/>
                            </div>
                        }
                    >

                        {mentee.lists.data.map((m, i) => (

                            <Link className={classNames(styles['link'])} to={`/mentees/${m.mentee_srl}`} key={i}>
                                <Card className={styles['mentors-cards']}>
                                    <Card.Body>
                                        <Card.Title className={styles['mentors-title']}>
                                            {m.profile_image ? <Card.Img src={m.profile_image} /> : ""}
                                            {m.name}</Card.Title>
                                        <Card.Text className={styles['mentors-contents']}>
                                            {m.introduce}<br/>
                                            <reactIconFa.FaRunning className={styles['icons']}/>
                                            {m.crops}<br/>
                                            <reactIconFa.FaMapMarked className={styles['icons']}/>
                                            {m.target_area}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        ))}
                    </InfiniteScroll>
                </CardColumns>
            </div>
        );
    }

    componentDidMount() {

        const {getMains} = this.props;
        getMains.menteeLists(1);
    }
}

const mapStateToProps = (state) => ({

    mentee: state.mentee
})

const mapDispatchToProps = (dispatch) => ({

    getMains: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentees);
