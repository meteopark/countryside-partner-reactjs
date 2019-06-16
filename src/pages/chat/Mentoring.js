import React, {Component, useState, useEffect, useRef} from 'react';
import API from "../api/api";
import classNames from "classnames";
import styles from "../diaries/Diary.module.scss";

import 'react-chat-elements/dist/main.css';
import {MessageList, Input, Button} from 'react-chat-elements'


export function Mentoring({match}) {

    const whoami = `${localStorage.getItem('user_type')}|${localStorage.getItem('srl')}`;
    const [message, setMessage] = useState('');
    const [chatLists, setChatLists] = useState([]);
    const [chatId, setChatId] = useState('');
    const inputRef = useRef(null);

    const onChangeMessage = () => {

        if (message !== '') {

            let formData = new FormData();
            formData.append('to', 2231);


            formData.append('chat_lists_id', chatId);
            formData.append('from', `${localStorage.getItem('user_type')}|${localStorage.getItem('srl')}`);
            formData.append('message', message);

            API.sendMessage(formData).then((res) => {

                let newMessage = {
                    avatar: 'http://image.news1.kr/system/photos/2018/3/29/3036479/article.jpg',
                    position: whoami === res.from ? 'right' : 'left',
                    type: 'text',
                    text: res.message,
                    date: new Date(res.created_at)
                }

                inputRef.current.clear();

                setChatId(res.chat_lists_id);
                setChatLists([...chatLists, newMessage]);
            });
        }
    };

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        setChatId(match.params.chat_id);
        API.getMessageLists(match.params.chat_id).then((res) => {

            let messageLists = [];
            res.data.map((chat) => {
                console.log('useEffect ...');
                let newMessage = {
                    avatar: 'http://image.news1.kr/system/photos/2018/3/29/3036479/article.jpg',
                    position: whoami === chat.from ? 'right' : 'left',
                    type: 'text',
                    text: chat.message,
                    date: new Date(chat.created_at)
                };
                messageLists.push(newMessage);
            });
            setChatLists(messageLists.reverse());
        });
    }, []);

    return (
        <div className="container">
            <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={chatLists}/>
            <hr/>
            <Input
                ref={inputRef}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메세지를 입력하세요."
                multiline={true}
                minHeight={100}
                maxHeight={100}
                rightButtons={
                    <Button
                        onClick={() => onChangeMessage()}
                        color='white'
                        backgroundColor='black'
                        text='보내기'/>
                }/>
        </div>
    )

}