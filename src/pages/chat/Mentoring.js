import React, {Component, useState, useEffect} from 'react';
import API from "../api/api";
import classNames from "classnames";
import styles from "../diaries/Diary.module.scss";

import 'react-chat-elements/dist/main.css';
import {MessageList, Input, Button} from 'react-chat-elements'


export function Mentoring() {

    const [message, setMessage] = useState('');

    const onChangeMessage = () => {

        console.log("---",message);
    };

    useEffect(() => {

        // API.getOpenApiChatIntro().then((response) => {
        //
        //     setMessage(response.text);
        // });
    }, []);


    return (
        <div className="container">

            <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={
                    [
                        {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                        {
                            position: 'left',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                        },
                    ]
                }/>
            <hr/>
            <Input
                // value={() => setMessage(this.message)}
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