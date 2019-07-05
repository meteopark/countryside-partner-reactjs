import React, {useState, useEffect} from 'react';

import styles from './Header.module.scss';
import classNames from "classnames";
import {Row, Col, Button} from "react-bootstrap";
import history from '../history';
import * as reactIconFa from "react-icons/fa";
import {ChatList} from 'react-chat-elements'
import API from "../api/api";
import {Link} from "react-router-dom";
import {RecommendDiaries} from "./RecommendDiaries";


export const MyPage = () => {


    const [whoAmI, setWhoAmI] = useState(null);
    const [user, setUser] = useState({});
    const [chatLists, setChatLists] = useState([]);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        setWhoAmI(localStorage.getItem('user_type') + "_" + localStorage.getItem('srl'));

        if(whoAmI !== null){
            getUserInfo();
            getChatLists();
        }
    }, [whoAmI]);

    const handleClickItem = (e) => {

        history.push({
            pathname: '/chat/mentoring/' + e.id,
            state: {
                userInfo: e.userInfo,
            }
        });
    }

    const getUserInfo = () => {

        API.getUserInfo().then((res) => {

            let userInfo = {
                name: res.name,
                id: res.id,
                profile_image: res.profile_image,
                introduce: res.introduce,
                homi: res.homi,
            }
            setUser(userInfo);
        });
    }

    const getChatLists = () => {

        API.getChatLists().then((res) => {

            res.map((chat) => {

                let list = {
                    id: chat.id,
                    userInfo: whoAmI !== chat.constructor ? chat.participants : chat.constructor,
                    avatar: whoAmI !== chat.constructor ? chat.constructor_image : chat.participants_image,
                    title: whoAmI !== chat.constructor ? chat.constructor_name : chat.participants_name,
                    subtitle: chat.last_message[0]['message'] ? chat.last_message[0]['message'] : "",
                    date: new Date(chat.updated_at),
                    unread: 0,
                };
                setChatLists(lists => lists.concat(list));
            });
        });
    }

    return (
        <div>
            <div className={classNames('container', styles['in-container'])}>
                <Row>
                    <Col><h4><reactIconFa.FaUserAlt className={styles['main-icon']}/>내 정보</h4></Col>
                    <Col className="text-right">
                        <Link to="/mypage/edit" className={styles['link']}>
                            <Button variant="warning" size="sm">
                                <reactIconFa.FaUserCog className={styles['icon']}/><b>Edit</b>
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <hr/>
                <Row className={styles['mypage-container']}>
                    <Col sm={3} className={classNames('text-center',styles['mypage-row'])}>
                        <img src={user.profile_image} className={styles['mypage-image']} alt="프로필 이미지"/>
                    </Col>
                    <Col>
                        <Row className={styles['mypage-row']}><Col><li>아이디 : {user.id}</li></Col></Row>
                        <Row className={styles['mypage-row']}><Col><li>이름 : {user.name}</li></Col></Row>
                        <Row className={styles['mypage-row']}><Col><li>소개 : {user.introduce}</li></Col></Row>
                        <Row className={styles['mypage-row']}><Col><li>보유호미 : {user.homi}개</li></Col></Row>
                    </Col>
                </Row>

            </div>

            <div className={classNames('container', styles['in-container'])}>
                <h4><reactIconFa.FaStream className={styles['main-icon']}/>채팅목록</h4>
                <hr/>
                <div className={styles['mypage-chat-container']}>
                    <ChatList
                        onClick={e => handleClickItem(e)}
                        className='chat-list'
                        dataSource={chatLists}/>
                    {
                        chatLists.length < 1 ?
                            <div className={styles['empty-content']}>
                                대화중인 내용이 없습니다.
                            </div>
                            : ""
                    }
                </div>
            </div>

            <RecommendDiaries/>
        </div>
    )
}

