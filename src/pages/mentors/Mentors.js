import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from './Mentors.module.scss';
import {Link} from 'react-router-dom';
import {CardColumns, Card, Spinner} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

class Mentors extends Component {

    constructor(props){
        super(props);
        this.state = {
            hasMore: true
        }
    }

    loadItems = () => {

        const {mentor, getMains} = this.props;
        if (mentor.lists.last_page === mentor.lists.current_page) this.setState({hasMore: false});
        setTimeout(() => {
            getMains.mentorLists(mentor.lists.current_page + 1);
        }, 1000);
    }

    render() {

        const {mentor} = this.props;

        return (

            <div className={classNames('container', styles['in-container'])}>

                <p className={styles['header-container']}>
                    <reactIconFa.FaRegLaugh className={styles['main-icon']}/>
                    멘토소개
                </p>
                <CardColumns bsPrefix={'card-columns-custom'}>

                    <InfiniteScroll
                        dataLength={mentor.lists.data.length}
                        next={this.loadItems}
                        hasMore={mentor.lists.data.length < 1 ? false : this.state.hasMore}
                        loader={<div><br/><div className={classNames("text-center", styles['infinite-loader'])}><Spinner
                            animation="border" variant="success"/></div><br/></div>}
                        endMessage={
                            <div className="text-center">
                                <img src="/images/ico/homi.png" className={styles['homi']}/>
                            </div>
                        }
                    >
                    {mentor.lists.data.map((mentors, i) => (

                        <Link className={classNames(styles['link'])} to={`/mentors/${mentors.mentor_srl}`} key={i}>
                            <Card className={styles['mentors-cards']}>
                                <Card.Body>
                                    <Card.Title className={styles['mentors-title']}>{mentors.profile_image ? <Card.Img src={mentors.profile_image} /> : ""}{mentors.farm_name}</Card.Title>
                                    <Card.Text className={styles['mentors-contents']}>
                                        <reactIconFa.FaUserAlt className={styles['icons']} />{mentors.name}<br/>
                                        {/*<reactIconFa.FaHome className={styles['icons']} />{mentors.address}<br/>*/}
                                        <reactIconFa.FaSeedling className={styles['icons']} />{mentors.crops}<br/>
                                        <reactIconFa.FaTractor className={styles['icons']} />{mentors.career}
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
        getMains.mentorLists(1);
    }
}

const mapStateToProps = (state) => ({

    mentor: state.mentor
})

const mapDispatchToProps = (dispatch) => ({

    getMains: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentors);
