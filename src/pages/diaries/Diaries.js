import React, {Component} from 'react';
import styles from './Diary.module.scss';
import classNames from "classnames";
import {Link} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {Spinner, Row, Col, Image, Button} from 'react-bootstrap';
import * as reactIconFa from "react-icons/fa";

class Diaries extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        const {diaries, loadItems, hasMore, user} = this.props;

        return (

            <div className={classNames('container', styles['blog-container'])}>

                <div className={styles['blog-header']}>
                    <reactIconFa.FaPenNib className={styles['main-icon']}/>
                    영농일지

                    {
                        parseInt(localStorage.getItem('srl')) === user.srl && localStorage.getItem('user_type') === user.user_type.toUpperCase() ?
                            <div className={styles['write']}>
                                <Link className={classNames(styles['link'])}
                                      to={`/${user.user_type}s/${user.srl}/create`}>
                                    <Button size="sm" variant="outline-dark"
                                            className={classNames(styles['mentoring-button'])}>글 쓰기</Button>
                                </Link>
                            </div>
                            : ""
                    }
                </div>

                {diaries.data.length < 1 ?
                    <div className={styles['empty-content']}><Col>등록 된 일지가 없습니다.</Col></div>
                    :
                    <InfiniteScroll
                        dataLength={diaries.data.length}
                        next={loadItems}
                        hasMore={diaries.data.length < 1 ? false : hasMore}
                        loader={<div className={classNames("text-center", styles['infinite-loader'])}><Spinner
                            animation="border" variant="success"/></div>}
                        endMessage={
                            <Row className="text-center">
                                <Col><img src="/images/ico/homi.png" className={styles['homi']}/></Col>
                            </Row>
                        }
                    >
                        {diaries.data.map((diary, i) => (
                            <Link
                                className={styles['link']}
                                to={`/${diary.user_type}s/${diary.srl}/diaries/${diary.diary_srl}`}
                                key={i}
                            >
                                <Row
                                    key={diary.diary_srl}
                                    className={classNames('justify-content-md-center', styles['blog-post-container'])}>
                                    {
                                        diary.image ?
                                            <Col lg={{span: 3, order: 2}}><Image
                                                src={diary.image}
                                                className={styles['blog-image']} fluid/></Col>
                                            : ""
                                    }
                                    <Col lg={{span: diary.image ? 7 : 10, order: 1}}>
                                        <div className={styles['blog-post']}>
                                            <h5 className={styles['blog-title']}>{diary.title}</h5>
                                            <p className={styles['blog-post-contents']}>{diary.contents}</p>
                                        </div>
                                        <p className={styles['timestamp']}>{diary.regdate}</p>
                                    </Col>
                                </Row>
                            </Link>
                        ))}
                    </InfiniteScroll>
                }
            </div>
        );
    }
}

export default Diaries;
