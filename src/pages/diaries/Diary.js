import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from './Diary.module.scss';
import {Spinner, Row, Col, Image, Jumbotron, Container, Button} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import {Link} from "react-router-dom";

class Diary extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        console.log("---", this.props.mapStateToPropsDiary.diary);
        return (

            <div className={classNames('container', styles['in-container'])}>

                    {/*{mentor === undefined ? "" :*/}
                    {/*    <div style={jumbotronStyle}>*/}
                    {/*        <Jumbotron fluid style={jumbotronContentsStyle}>*/}
                    {/*            <Container>*/}
                    {/*                <Row>*/}
                    {/*                    <Col sm={3} className={styles['profile-container']}>*/}
                    {/*                        <Image*/}
                    {/*                            className={styles['profile-image']}*/}
                    {/*                            roundedCircle*/}
                    {/*                            src={mentor.profile_image ? mentor.profile_image : '/images/no-image.png'}*/}
                    {/*                        />*/}
                    {/*                        <br/>*/}
                    {/*                        <Button variant="success" className={styles['mentoring-button']}>*/}
                    {/*                            <reactIconFa.FaPaperPlane className={styles['icon']}/>*/}
                    {/*                            멘토링 요청*/}
                    {/*                        </Button>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col className={styles['profile-info']}>*/}
                    {/*                        <h1>{mentor.farm_name ? mentor.farm_name : "NULL"}</h1>*/}
                    {/*                        <p>*/}
                    {/*                            <reactIconFa.FaUserAlt className={styles['icon']}/>*/}
                    {/*                            {mentor.name} ({mentor.id})*/}
                    {/*                        </p>*/}
                    {/*                        <p>*/}
                    {/*                            <reactIconFa.FaHome className={styles['icon']}/>*/}
                    {/*                            {mentor.address}*/}
                    {/*                        </p>*/}
                    {/*                        <p>*/}
                    {/*                            <reactIconFa.FaSeedling className={styles['icon']}/>*/}
                    {/*                            {mentor.crops}*/}
                    {/*                        </p>*/}
                    {/*                        <p>*/}
                    {/*                            <reactIconFa.FaTractor className={styles['icon']}/>*/}
                    {/*                            {mentor.career}*/}
                    {/*                        </p>*/}
                    {/*                        <p>*/}
                    {/*                            <reactIconFa.FaPiedPiperHat className={styles['icon']}/>*/}
                    {/*                            {mentor.homi}개*/}
                    {/*                        </p>*/}
                    {/*                        <p>*/}
                    {/*                            <reactIconFa.FaUserFriends className={styles['icon']}/>*/}
                    {/*                            멘토링 {mentor.mentoring_count}회*/}
                    {/*                        </p>*/}
                    {/*                    </Col>*/}
                    {/*                </Row>*/}
                    {/*            </Container>*/}
                    {/*        </Jumbotron>*/}
                    {/*    </div>*/}
                    {/*}*/}
                {this.props.mapStateToPropsDiary.diary.map((diary, i) => (

                    <div className={styles['diary-container']} key={i}>
                        <h2 className={styles['diary-title']}>{diary.title}</h2>


                        <div className={styles['user-info']}>
                            <Link
                                className={styles['link']}
                                to={`/mentors/${diary.mentor_srl}`}
                            >
                            <Image
                                className={styles['profile']}
                                roundedCircle
                                src={diary.mentor.profile_image ? diary.mentor.profile_image : '/images/no-image.png'}
                            />
                            {diary.mentor.name}
                            </Link>
                            <span className={styles['timestamp']}>{diary.regdate}</span>
                        </div>


                        <div className={styles['diary-contents']}>

                            <Image src='https://cdn.pixabay.com/photo/2015/07/30/21/49/nature-868401_960_720.jpg'
                                   className={styles['diary-image']}/>
                            <p className={styles['contents']}>{diary.contents}</p>
                        </div>

                    </div>
                ))}
            </div>
        );
    }

    componentDidMount() {

        const {actionMentor, match} = this.props;
        actionMentor.getDiary(match.params.diary_id);
    }

    shouldComponentUpdate(nextProps, nextState) {

        // if(nextProps.mapStateToPropsMentor.mentor === undefined) return false;
        return true;
    }

}

const mapStateToProps = (state) => ({

    mapStateToPropsDiary: state.diary
})

const mapDispatchToProps = (dispatch) => ({

    actionMentor: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
