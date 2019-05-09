import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from './Mentors.module.scss';
import {Link} from 'react-router-dom';
import {Row, Col, Image} from 'react-bootstrap';
import classNames from "classnames";


class Mentors extends Component {

    render() {

        return (
            <div className={classNames('container')}>
                {this.props.mains.lists.map((mentors, i) => (
                    <Link className={styles['link']} to={`/mentors/${mentors.mentor_srl}`} key={i}>
                        <Row className={styles['cards-container']}>
                            <Col sm={3} className={styles['card-image-col']}>
                                <Image className={styles['card-image']}
                                       src={mentors.profile_image ? mentors.profile_image : '/images/no-image.png'}/>
                            </Col>
                            <Col sm={9}>
                                <div className={styles['card-contents-container']}>
                                    <h3>{mentors.farm_name}</h3>
                                    <h5 className={styles['card-contents']}>
                                        <p>이름 : {mentors.name}</p>
                                        <p>주소 : {mentors.address}</p>
                                        <p>주요작물 : {mentors.crops}</p>
                                        <p>경력 : {mentors.career}</p>
                                    </h5>
                                </div>
                            </Col>
                        </Row>
                    </Link>
                ))}
            </div>
        );
    }

    componentDidMount() {

        const {getMains} = this.props;
        getMains.mentorLists();
    }
}

const mapStateToProps = (state) => ({

    mains: state.mains // state.mains 는 reducers/Village.js 의 키값과 같아야 한다
})

const mapDispatchToProps = (dispatch) => ({

    getMains: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentors);
