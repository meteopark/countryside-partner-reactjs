import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from './Mentors.module.scss';
import {Link} from 'react-router-dom';
import {Figure, Container, Row, Col, Card, Button, Image, CardColumns, Badge} from 'react-bootstrap';
import classNames from "classnames";


class Mentor extends Component {

    render() {

        let mentorName = null;
        let mentorId = null;




        let testArray = [
            0,1,2,3,4,5,6,7,8,9,10,11,12
        ];

        return (
            <div>
                <div className={classNames('container')}>
                    {this.props.mapStateToPropsMentor.data.map((mentor, i) => {

                        mentorName = mentor.name;
                        mentorId = mentor.id;

                        return (

                            <Row className={styles['cards-container']} key={i}>
                                <Col sm={3} className={styles['card-image-col']}>
                                    <Image className={styles['card-image']}
                                           roundedCircle
                                           src1={mentor.profile_image ? mentor.profile_image : '/images/no-image.png'}/>
                                </Col>
                                <Col sm={9}>
                                    <div className={styles['card-contents-container']}>
                                        <h3>{mentor.farm_name}</h3>
                                        <h5 className={styles['card-contents']}>
                                            <p>이름 : {mentor.name}</p>
                                            <p>주소 : {mentor.address}</p>
                                            <p>주요작물 : {mentor.crops}</p>
                                            <p>경력 : {mentor.career}</p>
                                        </h5>
                                    </div>
                                </Col>
                            </Row>
                        )
                    })}
                </div>
                <div className={styles['blog-container-fluid']}>
                    <div className={classNames('container', styles['blog-container'])}>
                        <h5 className={styles['blog-title']}>{mentorName} ({mentorId})님의 블로그</h5>



                        {/*{this.props.mapStateToPropsMentor.data.map((mentor, i) => {*/}
                        {testArray.map((mentor, i) => {

                            return (

                                <Row className={styles['blog-post']}>
                                    <Col sm={9}>
                                        <div className={styles['card-contents-container']}>
                                            <h4>아름다운 블로그</h4>
                                            <p className={styles['card-contents']}>
                                                2019.04.25 12:25
                                            </p>
                                            <p className={styles['card-contents']}>
                                                아벤느 클렌징 워터
                                                요즘 미세먼지가 심해서 모공속 까지 클렌징 해주는 제품이 필요했는데 세안 후 당김없이 촉촉하게 클렌징 할 수 있는 아벤느제품이라 매일 자극 없이 사용하기에 만족스럽습니다
                                                요즘 미세먼지가 심해서 모공속 까지 클렌징 해주는 제품이 필요했는데 세안 후 당김없이 촉촉하게 클렌징 할 수 있는 아벤느제품이라 매일 자극 없이 사용하기에 만족스럽습니다
                                            </p>
                                        </div>
                                    </Col>
                                    <Col sm={3}>
                                        <Image className={styles['post-image']}
                                               src='https://i.ytimg.com/vi/L-3LCCaOmvA/maxresdefault.jpg'/>
                                    </Col>
                                </Row>
                            )
                        })}
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
