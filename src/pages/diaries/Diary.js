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

        const {diary} = this.props;
        let user_type = null;

        return (

            <div className={classNames('container', styles['in-container'])}>

                {diary.map((diary, i) => {

                    if(diary.mentor) {
                        user_type = diary.mentor;
                    }else {
                        user_type = diary.mentee;
                    }

                    return (
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
                                    src={user_type.profile_image ? user_type.profile_image : '/images/no-image.png'}
                                />{user_type.name}
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
                            diary.is_owner === true ?
                                <div className={classNames('text-right', styles['button-group'])}>
                                    <Button variant="secondary" onClick={() => this.props.handleDiaries()}>목록</Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button variant="warning" onClick={() => this.props.handleDiaryModify(diary.diary_srl)}>수정</Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button variant="danger" onClick={() => this.props.handleDiaryDelete(diary.diary_srl)}>삭제</Button>
                                </div>
                                : ""
                        }
                    </div>)
                })}
            </div>
        );
    }
}

export default Diary;
