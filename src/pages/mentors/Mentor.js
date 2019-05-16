import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from './Mentors.module.scss';
import {Container, Row, Col, Image, Jumbotron, Button} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";


class Mentor extends Component {

    render() {


        // const diariesRows = Object.keys(this.props.mapStateToPropsMentor.data[]);
        // console.log("ggg", diariesRows);

        const mentor = this.props.mapStateToPropsMentor.data;

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

        return (

            <div>
                <div className={styles['blog-container-fluid']}>

                    <div style={jumbotronStyle}>

                        <Jumbotron fluid style={jumbotronContentsStyle}>
                            <Container>
                                <Row>
                                    <Col sm={3} className={styles['profile-container']}>
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
                                        <h1>{mentor.farm_name}</h1>
                                        <p>
                                            <reactIconFa.FaUserAlt className={styles['icon']}/>
                                            {mentor.name} ({mentor.id})
                                        </p>
                                        <p>
                                            <reactIconFa.FaHome className={styles['icon']}/>
                                            {mentor.address}
                                        </p>
                                        <p>
                                            <reactIconFa.FaSeedling className={styles['icon']}/>
                                            {mentor.crops}
                                        </p>
                                        <p>
                                            <reactIconFa.FaTractor className={styles['icon']}/>
                                            {mentor.career}
                                        </p>
                                        <p>
                                            <reactIconFa.FaPiedPiperHat className={styles['icon']}/>
                                            {mentor.homi}개
                                        </p>
                                        <p>
                                            <reactIconFa.FaUserFriends className={styles['icon']}/>
                                            멘토링 {mentor.mentoring_count}회
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Jumbotron>
                    </div>
                    <div className={classNames('container', styles['blog-container'])}>

                        <p className={styles['blog-header']}>농업일지</p>

                        {mentor.diaries.length > 0 ?

                            mentor.diaries.map((diary) => {

                                return (

                                    <Row
                                        key={diary.diary_srl}
                                        className={classNames('justify-content-md-center', styles['blog-post-container'])}>
                                        <Col lg={{span: 3, order: 2}}>
                                            <Image
                                                src='https://cdn.pixabay.com/photo/2015/07/30/21/49/nature-868401_960_720.jpg'
                                                className={styles['blog-image']}
                                                fluid
                                            />
                                        </Col>
                                        <Col lg={{span: 7, order: 1}}>
                                            <div className={styles['blog-post']}>
                                                <h5 className={styles['blog-title']}>{diary.title}</h5>
                                                <p className={styles['blog-post-contents']}>
                                                    아벤느 클렌징 워터
                                                    요즘 미세먼지가 심해서 모공속 까지 클렌징 해주는 제품이 필요했
                                                    는데 세안 후 당김없이 촉촉하게 클렌징 할 수 있는 아벤느제품이라 매일 자극 없이 사용하기에 만족스럽습니다
                                                    는데 세안 후 당김없이 촉촉하게 클렌징 할 수 있는 아벤느제품이라 매일 자극 없이
                                                </p>
                                            </div>
                                            <p className={styles['timestamp']}>2019.04.25 12:25</p>
                                        </Col>
                                    </Row>
                                )
                            })
                            :
                            <Row className={styles['empty-content']}>
                                <Col>
                                    등록 된 일지가 없습니다.
                                </Col>
                            </Row>
                        }
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {

        const {actionMentor, match} = this.props;
        actionMentor.getMentor(match.params.mentor);
    }
}

const mapStateToProps = (state) => ({

    mapStateToPropsMentor: state.mentor // value 값의 state.mains 는 reducers/* 의 키값과 같아야 한다
})

const mapDispatchToProps = (dispatch) => ({

    actionMentor: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentor);
