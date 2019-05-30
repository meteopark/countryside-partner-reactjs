import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from './Diary.module.scss';
import {Button, ButtonToolbar, Image} from 'react-bootstrap';
import classNames from "classnames";
import {Link} from "react-router-dom";

class Diary extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        return (

            <div className={classNames('container', styles['in-container'])}>

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

                            {
                                diary.image ?
                                    <Image src={diary.image}
                                           className={styles['diary-image']}/>
                                    : ""
                            }

                            <p className={styles['contents']}>{diary.contents}</p>
                        </div>
                        {

                            localStorage.getItem('srl') == diary.mentor_srl ?
                                <div className={classNames('text-right', styles['button-group'])}>
                                    <Link className={classNames(styles['link'])}
                                          to={`/mentors/${diary.mentor_srl}`}>
                                        <Button variant="secondary">목록</Button>
                                    </Link>&nbsp;&nbsp;&nbsp;

                                    <Link className={classNames(styles['link'])}
                                          to={`/mentors/${diary.mentor_srl}/diaries/${diary.diary_srl}/modify`}
                                    >
                                        <Button variant="warning">수정</Button>
                                    </Link>&nbsp;&nbsp;&nbsp;

                                    <Link className={classNames(styles['link'])}
                                          to={`/mentors/${diary.mentor_srl}/create`}
                                    >
                                        <Button variant="danger">삭제</Button>
                                    </Link>
                                </div>
                                : ""
                        }
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
