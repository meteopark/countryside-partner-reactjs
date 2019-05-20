import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from './Mentors.module.scss';
import {Spinner, Row, Col, Image, Jumbotron, Container, Button} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import {Link} from "react-router-dom";


class Machine extends Component {

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

        const jumbotronStyle = {
            backgroundImage: 'url(/images/bg/profile-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        };

        return (

            <div>
                <div className={styles['blog-container-fluid']}>
                    <div style={jumbotronStyle}>
                        <div className={styles['blog-introduce']}>
                            <Container className={styles['profile-container']}>
                                <Row className="justify-content-md-center">
                                    <Col sm={3} className={styles['profile-image-container']}>
                                        <Image
                                            className={styles['profile-image']}
                                            roundedCircle
                                            src={mentor.profile_image ? mentor.profile_image : '/images/no-image.png'}
                                        />
                                        <br/>
                                        <Button variant="success" className={styles['mentoring-button']}>
                                            <reactIconFa.FaPaperPlane className={styles['icon']}/>
                                            멘토링 요청
                                        </Button>
                                    </Col>
                                    <Col className={styles['profile-info']}>
                                        <h1>{mentor.farm_name ? mentor.farm_name : "NULL"}</h1>
                                        <reactIconFa.FaUserAlt className={styles['icon']}/>
                                        {mentor.name} ({mentor.id})
                                        <br/>
                                        <reactIconFa.FaHome className={styles['icon']}/>
                                        {mentor.address}
                                        <br/>
                                        <reactIconFa.FaSeedling className={styles['icon']}/>
                                        {mentor.crops}
                                        <br/>
                                        <reactIconFa.FaTractor className={styles['icon']}/>
                                        {mentor.career}
                                        <br/>
                                        <reactIconFa.FaPiedPiperHat className={styles['icon']}/>
                                        {mentor.homi}개
                                        <br/>
                                        <reactIconFa.FaUserFriends className={styles['icon']}/>
                                        멘토링 {mentor.mentoring_count}회
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>


                    <div className={classNames('container', styles['blog-container'])}>

                        <p className={styles['blog-header']}>
                            <reactIconFa.FaPenNib className={styles['main-icon']}/>
                            영농일지
                        </p>
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
                                {diaries.data.map((diary) => (
                                    <Link
                                        className={styles['link']}
                                        to={`/diaries-mentors/articles/${diary.diary_srl}`}>
                                        <Row
                                            key={diary.diary_srl}
                                            className={classNames('justify-content-md-center', styles['blog-post-container'])}>
                                            {
                                                diary.image ?
                                                    <Col lg={{span: 3, order: 2}}><Image
                                                        src='https://cdn.pixabay.com/photo/2015/07/30/21/49/nature-868401_960_720.jpg'
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

export default connect(mapStateToProps, mapDispatchToProps)(Machine);

//http://data.mafra.go.kr/opendata/data/indexOpenDataDetail.do?data_id=20141120000000000358&filter_ty=O&getBack=O&sort_id=rdcnt&s_data_nm=&instt_id=201410120001&cl_code=&shareYn=
// http://211.237.50.150:7080/openapi/b4f371498f96c269899f61303f99cd9a4e1a9bcc6693ffb906eb4d12fc141174/json/Grid_20141119000000000080_1/1/10?YEAR=2014