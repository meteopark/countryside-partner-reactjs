import React, {Component} from 'react';
import {Card, CardColumns, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import styles from './Main.module.scss';
import classNames from 'classnames';


export class MentorIntroduce extends Component {

    render() {

        return (
            <div className={classNames('container', styles['in-container'])}>
                <h5>
                    <div className={styles['sub-title']}>멘토를 소개 합니다</div>
                </h5>
                <CardColumns>
                    {this.props.mains.lists.map((mentors, i) => (

                        <Card key={i}>
                            <Link className={styles['link']} to={`/mentors/${mentors.mentor_srl}`}>
                                <div className={styles['image-container']}>
                                    <Card.Img variant="top" className={styles['image-blank']} src={mentors.profile_image ? mentors.profile_image : '/images/no-image.png' } />
                                    <Badge variant="info" className={styles['badge-crops']}>{mentors.crops}</Badge>
                                    <Badge variant="warning" className={styles['badge']} >{mentors.farm_name} ({mentors.career})</Badge>
                                </div>
                            </Link>
                        </Card>
                     ))}
                </CardColumns>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

    mains: state.mains // state.mains 는 reducers/mentors.jsjs 의 키값과 같아야 한다
})

export default connect(mapStateToProps)(MentorIntroduce);

