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
import {withRouter} from "react-router-dom";


class Mentoring extends Component {

    constructor(props) {

        super(props);
        this.state = {
            hasMore: true,
            mentor: {
                mentor_srl: null
            },
            diaries: [],
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
                        {diaries.data.length < 1 ? <div className={styles['empty-content']}><Col>등록 된 일지가 없습니다.</Col></div> : ""}
                        <InfiniteScroll
                            scrollableTarget="scrollableDiv"
                            dataLength={diaries.data.length}
                            next={this.loadItems}
                            hasMore={diaries.data.length < 1 ? false : this.state.hasMore}
                            loader={<div className={classNames("text-center", styles['infinite-loader'])}><Spinner animation="border" variant="success"/></div>}
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        /*
        이 API는 컴포넌트에서 render() 를 호출하고난 다음에 발생하게 됩니다. 이 시점에선 this.props 와 this.state 가 바뀌어있습니다.
        그리고 파라미터를 통해 이전의 값인 prevProps 와 prevState 를 조회 할 수 있습니다.
        그리고, getSnapshotBeforeUpdate 에서 반환한 snapshot 값은 세번째 값으로 받아옵니다.
         */
        if (this.props.match.params.mentor !== prevProps.match.params.mentor) {

            const {actionMentor, match} = this.props;
            actionMentor.getMentor(match.params.mentor);
            actionMentor.getMentorDiaries(match.params.mentor, 1);
        }
    }
}

const mapStateToProps = (state) => ({
    mapStateToPropsMentor: state.mentor.mentor,
    mapStateToPropsMentorDiaries: state.mentor.diaries
})

const mapDispatchToProps = (dispatch) => ({
    actionMentor: bindActionCreators(importActions, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Mentoring));