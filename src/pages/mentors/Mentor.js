import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from './Mentors.module.scss';
import {Spinner, Row, Col, Image, Button} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import {Link} from "react-router-dom";
import {MentorProfile} from "./MentorProfile";


class Mentoring extends Component {

    constructor(props) {

        super(props);
        this.state = {
            hasMore: true
        }
    }

    loadItems = () => {

        const {actionMentor, match, mapStateToPropsMentorDiaries} = this.props;

        if (mapStateToPropsMentorDiaries.last_page === mapStateToPropsMentorDiaries.current_page) this.setState({hasMore: false});

        setTimeout(() => {
            actionMentor.getMentorDiaries(match.params.mentor, mapStateToPropsMentorDiaries.current_page + 1);
        }, 1000);
    }

    render() {

        const mentor = this.props.mapStateToPropsMentor;
        const diaries = this.props.mapStateToPropsMentorDiaries;

        return (

            <div>
                <MentorProfile mentor={mentor}/>
                <div className={classNames('container', styles['blog-container'])}>

                    <div className={styles['blog-header']}>
                        <reactIconFa.FaPenNib className={styles['main-icon']}/>
                        영농일지

                        {
                            localStorage.getItem('srl') == mentor.mentor_srl ?
                            <div className={styles['write']}>
                                <Link className={classNames(styles['link'])}
                                      to={`/mentors/${mentor.mentor_srl}/create`}>
                                    <Button size="sm" variant="outline-dark"
                                            className={classNames(styles['mentoring-button'])}>글 쓰기</Button>
                                </Link>
                            </div>
                            : ""
                        }
                    </div>

                    <div id="scrollableDiv" className={styles['scroll-container']}>
                        {diaries.data.length < 1 ?
                            <Row className={styles['empty-content']}><Col>등록 된 일지가 없습니다.</Col></Row> : ""}
                        <InfiniteScroll
                            scrollableTarget="scrollableDiv"
                            dataLength={diaries.data.length}
                            next={this.loadItems}
                            hasMore={diaries.data.length < 1 ? false : this.state.hasMore}
                            loader={<div className={classNames("text-center", styles['infinite-loader'])}><Spinner
                                animation="border" variant="success"/></div>}
                            endMessage={
                                <Row className="text-center">
                                    <Col><img src="/images/ico/homi.png" className={styles['homi']}/></Col>
                                </Row>
                            }
                        >
                            {diaries.data.map((diary, i) => (
                                <Link
                                    className={styles['link']}
                                    to={`/mentors/${diary.mentor_srl}/diaries/${diary.diary_srl}`}
                                    key={i}
                                >
                                    <Row
                                        key={diary.diary_srl}
                                        className={classNames('justify-content-md-center', styles['blog-post-container'])}>
                                        {
                                            diary.image ?
                                                <Col lg={{span: 3, order: 2}}><Image
                                                    src={diary.image}
                                                    className={styles['blog-image']} fluid/></Col>
                                                : ""
                                        }
                                        <Col lg={{span: diary.image ? 7 : 10, order: 1}}>
                                            <div className={styles['blog-post']}>
                                                <h5 className={styles['blog-title']}>{diary.title}</h5>
                                                <p className={styles['blog-post-contents']}>{diary.contents}</p>
                                            </div>
                                            <p className={styles['timestamp']}>{diary.regdate}</p>
                                        </Col>
                                    </Row>
                                </Link>
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {

        const {actionMentor, match} = this.props;
        actionMentor.getMentor(match.params.mentor);
        actionMentor.getMentorDiaries(match.params.mentor, 1);
    }

    shouldComponentUpdate(nextProps, nextState) {

        // if(nextProps.mapStateToPropsMentor === undefined) return false;
        // if(nextProps.mapStateToPropsMentorDiaries.data && nextProps.mapStateToPropsMentorDiaries.data.length < 1)return false;
        return true;
    }

}

const mapStateToProps = (state) => ({

    mapStateToPropsMentor: state.mentor.mentor,
    mapStateToPropsMentorDiaries: state.mentor.diaries
})

const mapDispatchToProps = (dispatch) => ({

    actionMentor: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentoring);