import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from './Diary.module.scss';
import {Spinner, Row, Col, Image, Jumbotron, Container, Button} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

class Diary extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        const mentor = this.props.mapStateToPropsMentor;

        console.log("--------", mentor);

        const jumbotronStyle = {
            backgroundImage: 'url(/images/bg/profile-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        };
        const jumbotronContentsStyle = {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: '#ffffff'
        };

        return (

            <div>

                <div className={styles['blog-container-fluid']}>

                    {mentor === undefined ? "" :
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
                                            <h1>{mentor.farm_name ? mentor.farm_name : "NULL"}</h1>
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
                    }

                    {mentor === undefined ? "" :
                        <div className={classNames('container', styles['blog-container'])}>


                            <div className={styles['blog-post']}>
                                <h5 className={styles['blog-title']}>{mentor.title}</h5>
                                <p className={styles['timestamp']}>{mentor.regdate}</p>
                                <p className={styles['blog-post-contents']}>
                                    <Image src='https://cdn.pixabay.com/photo/2015/07/30/21/49/nature-868401_960_720.jpg' className={styles['blog-image']} />
                                    <br/><br/>
                                    {mentor.contents}
                                </p>
                            </div>



                    </div>
                        }
                </div>
            </div>
        );
    }

    componentDidMount() {

        const {actionMentor, match} = this.props;
        actionMentor.getDiary(match.params.diary_id);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //
    //     // if(nextProps.mapStateToPropsMentor.mentor === undefined) return false;
    //     // return true;
    // }

}

const mapStateToProps = (state) => ({

    mapStateToPropsMentor: state.mentor.mentor
})

const mapDispatchToProps = (dispatch) => ({

    actionMentor: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
