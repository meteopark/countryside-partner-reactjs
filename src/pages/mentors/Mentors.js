import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from './Mentors.module.scss';
import {Link} from 'react-router-dom';
import {CardColumns, Card, Col} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";

class Mentors extends Component {

    render() {

        return (

            <div className={classNames('container')}>
                <CardColumns bsPrefix={'card-columns-custom'}>
                {this.props.mains.lists.map((mentors, i) => (

                    <Link className={styles['link']} to={`/mentors/${mentors.mentor_srl}`} key={i}>
                        <Card>
                            {mentors.profile_image ? <Card.Img src={mentors.profile_image} /> : ""}
                            <Card.Body>
                                <Card.Title>{mentors.farm_name}</Card.Title>
                                <Card.Text>
                                    <p><reactIconFa.FaUserAlt className={styles['icon']} />{mentors.name}</p>
                                    <p><reactIconFa.FaHome className={styles['icon']} />{mentors.address}</p>
                                    <p><reactIconFa.FaSeedling className={styles['icon']} />{mentors.crops}</p>
                                    <p><reactIconFa.FaTractor className={styles['icon']} />{mentors.career}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                ))}
                </CardColumns>
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
