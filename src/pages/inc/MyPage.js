import React, {useState, useEffect} from 'react';

import styles from './Header.module.scss';
import classNames from "classnames";
import DaumPostcode from 'react-daum-postcode';
import {Formik} from "formik";
import * as yup from 'yup';
import {Form, Row, Col, Button, InputGroup} from "react-bootstrap";
import axios from 'axios';
import {withAlert} from 'react-alert'
import history from '../history';
import * as reactIconFa from "react-icons/fa";
import {ChatList} from 'react-chat-elements'
import API from "../api/api";


export const MyPage = () => {


    const [chatLists, setChatLists] = useState([]);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        getChatLists();
    }, []);

    const handleClickItem = (e) => {

        history.push({
            pathname: '/chat/mentoring/' + e.id,
            state: {
                userInfo: e.userInfo,
            }
        });
    }

    const getChatLists = () => {

        let whoAmI = localStorage.getItem('user_type') + "_" + localStorage.getItem('srl');
        API.getChatLists().then((res) => {

            res.map((chat, i) => {

                let list = {
                    id: chat.id,
                    userInfo: whoAmI !== chat.constructor ? chat.participants : chat.constructor,
                    avatar: whoAmI !== chat.constructor ? chat.constructor_image : chat.participants_image,
                    alt: 'Reactjs',
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
                <h4>내 정보</h4>
                <hr/>
            </div>

            <div className={classNames('container', styles['in-container'])}>
                <h4>채팅목록</h4>
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
        </div>
    )
}

