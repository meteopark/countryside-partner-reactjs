import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from './Mentors.module.scss';
import {Container, Row, Col, Image, Jumbotron, Button} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios";
import * as types from "../../actions/ActionTypes";
import {Success} from "../../actions";


class Mentor extends Component {

    constructor(props) {

        super(props);

        this.state = {
            page: 1,
            tracks: [],
            hasMoreItems: true
        };
    }


    loadItems = () => {


        this.setState({
            page: this.state.page + 1,
        })

        const apiMentorDiaries = "http://countryside-partner-laravel.test/api/v1/diaries-mentors";

        return axios.get(`${apiMentorDiaries}/${this.props.match.params.mentor}/articles?page=${this.state.page}`)

            .then(res => {

                if(res) {

                    let tracks = this.state.tracks;
                    let data = res.data.response.data;

                    data.map((diary) => {

                        tracks.push(diary);
                    });

                    if(data.length < 1){

                        this.setState({hasMoreItems: false})
                    }
                }
            })
            .catch(error => {

                console.log("error : getMentorDiaries() " , error);
                throw(error);

            });
    }

    render() {

        const mentor = this.props.mapStateToPropsMentor;
        let diaries = this.props.mapStateToPropsMentorDiaries;

        const jumbotronStyle = {
            backgroundImage: 'url(/images/bg/profile-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        };
        const jumbotronContentsStyle = {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#ffffff'
        };


        let items = [];
console.log("ggo", this.state.tracks);
        this.state.tracks.map((diary) => {

            items.push(
                <Row
                    key={diary.diary_srl}
                    className={classNames('justify-content-md-center', styles['blog-post-container'])}>

                    {
                        diary.image ?
                        <Col lg={{span: 3, order: 2}}>
                            <Image
                                src='https://cdn.pixabay.com/photo/2015/07/30/21/49/nature-868401_960_720.jpg'
                                className={styles['blog-image']}
                                fluid
                            />
                        </Col>
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
            )
        });

        return (

            <div>
                <div className={styles['blog-container-fluid']}>

                    {/*<div style={jumbotronStyle}>*/}

                    {/*    <Jumbotron fluid style={jumbotronContentsStyle}>*/}
                    {/*        <Container>*/}
                    {/*            <Row>*/}
                    {/*                <Col sm={3} className={styles['profile-container']}>*/}
                    {/*                    <Image*/}
                    {/*                        className={styles['profile-image']}*/}
                    {/*                        roundedCircle*/}
                    {/*                        src={mentor.profile_image ? mentor.profile_image : '/images/no-image.png'}*/}
                    {/*                    />*/}
                    {/*                    <br/>*/}
                    {/*                    <Button variant="success" className={styles['mentoring-button']}>*/}
                    {/*                        <reactIconFa.FaPaperPlane className={styles['icon']}/>*/}
                    {/*                        멘토링 요청*/}
                    {/*                    </Button>*/}
                    {/*                </Col>*/}
                    {/*                <Col className={styles['profile-info']}>*/}
                    {/*                    <h1>{mentor.farm_name}</h1>*/}
                    {/*                    <p>*/}
                    {/*                        <reactIconFa.FaUserAlt className={styles['icon']}/>*/}
                    {/*                        {mentor.name} ({mentor.id})*/}
                    {/*                    </p>*/}
                    {/*                    <p>*/}
                    {/*                        <reactIconFa.FaHome className={styles['icon']}/>*/}
                    {/*                        {mentor.address}*/}
                    {/*                    </p>*/}
                    {/*                    <p>*/}
                    {/*                        <reactIconFa.FaSeedling className={styles['icon']}/>*/}
                    {/*                        {mentor.crops}*/}
                    {/*                    </p>*/}
                    {/*                    <p>*/}
                    {/*                        <reactIconFa.FaTractor className={styles['icon']}/>*/}
                    {/*                        {mentor.career}*/}
                    {/*                    </p>*/}
                    {/*                    <p>*/}
                    {/*                        <reactIconFa.FaPiedPiperHat className={styles['icon']}/>*/}
                    {/*                        {mentor.homi}개*/}
                    {/*                    </p>*/}
                    {/*                    <p>*/}
                    {/*                        <reactIconFa.FaUserFriends className={styles['icon']}/>*/}
                    {/*                        멘토링 {mentor.mentoring_count}회*/}
                    {/*                    </p>*/}
                    {/*                </Col>*/}
                    {/*            </Row>*/}
                    {/*        </Container>*/}
                    {/*    </Jumbotron>*/}
                    {/*</div>*/}
                    <div className={classNames('container', styles['blog-container'])}>

                        <p className={styles['blog-header']}>영농일지</p>




                            <div className={styles['scroll-container']}>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={this.loadItems}
                                hasMore={this.state.hasMoreItems}
                                loader={<div className="loader" key={0}>Loading ...</div>}
                                // useWindow={false}

                            >
                                {items}
                            </InfiniteScroll>
                            </div>
                            {/*<Row className={styles['empty-content']}><Col>등록 된 일지가 없습니다.</Col></Row>*/}


                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {

        const {actionMentor, match} = this.props;
        actionMentor.getMentor(match.params.mentor);
        // actionMentor.getMentorDiaries(match.params.mentor, this.state.page);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // return false 하면 업데이트를 안함
        // return this.props.checked !== nextProps.checked

        console.log("shouldComponentUpdate", nextProps.mapStateToPropsMentorDiaries.data.length);

        if(nextProps.mapStateToPropsMentorDiaries.data.length < 1)
        {
            // this.setState({hasMoreItems: false});
            return false;
        }

        // this.setState({hasMoreItems: nextProps.mapStateToPropsMentorDiaries.data.length < 1 ? false : true});

        return true;
    }


}

const mapStateToProps = (state) => ({

    // mapStateToPropsMentor: state.mentor.mentor,
    mapStateToPropsMentorDiaries: state.mentor.diaries
})

const mapDispatchToProps = (dispatch) => ({

    actionMentor: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentor);
