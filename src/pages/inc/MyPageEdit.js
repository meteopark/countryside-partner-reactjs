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
import {Link} from "react-router-dom";
import MyPageEditMentor from "./MyPageEditMentor";
import MyPageEditMentee from "./MyPageEditMentee";


export const MyPageEndit = () => {


    const [whoAmI, setWhoAmI] = useState(null);
    const [user, setUser] = useState({});
    const [chatLists, setChatLists] = useState([]);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        setWhoAmI(localStorage.getItem('user_type') + "_" + localStorage.getItem('srl'));
        getUserInfo();
    }, []);


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
            {localStorage.getItem('user_type') === "MENTOR" ? <MyPageEditMentor/> : <MyPageEditMentee/>}
        </div>
    )
}

