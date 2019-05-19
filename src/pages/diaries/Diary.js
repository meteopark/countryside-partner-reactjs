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
