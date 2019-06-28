import React, {Component} from 'react';
import {Card, CardColumns, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import styles from './Main.module.scss';
import classNames from 'classnames';
import * as reactIconFa from "react-icons/fa";
import * as importActions from "../../actions";
import {bindActionCreators} from 'redux';

export class MentorIntroduce extends Component {

    render() {

        return (
            <div className={classNames('container', styles['in-container'])}>
                <p className={styles['header-container']}>
                    <reactIconFa.FaChessQueen className={styles['main-icon']}/>
                    금주의 베스트 멘토
                </p>

                <CardColumns>
                    {this.props.mains.lists.map((mentors, i) => (

                        <Card key={i}>
                            <Link className={styles['link']} to={`/mentors/${mentors.mentor_srl}`}>
                                <div className={styles['image-container']}>
                                    <Card.Img variant="top" className={styles['image-blank']} src={mentors.profile_image.substring((mentors.profile_image.length)-11) === "homi_bg.png" ? '/images/empty.jpeg' : mentors.profile_image } />
                                    <Badge variant="warning" className={styles['badge-crops']}>{mentors.crops}</Badge>
                                    <Badge variant="dark" className={styles['badge']} >{mentors.farm_name} ({mentors.career})</Badge>
                                </div>
                            </Link>
                        </Card>
                     ))}
                </CardColumns>
            </div>
        )
    }

    componentDidMount() {
        const { getMains } = this.props;
        getMains.mainLists();
    }
}


const mapStateToProps = (state) => ({

    mains: state.mains // state.mains 는 reducers/Village.jsjs 의 키값과 같아야 한다
})

const mapDispatchToProps = (dispatch) => ({

    getMains: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MentorIntroduce);

