import React, {useState, useEffect, useRef} from 'react';
import API from "../api/api";
import classNames from "classnames";

import styles from "./Chat.module.scss";
import 'react-chat-elements/dist/main.css';
import {MessageList, Input, Button as Btn} from 'react-chat-elements'
import {Button} from "react-bootstrap";
import * as reactIconFa from "react-icons/fa";
import history from "../history";


export function Mentoring({match, location}) {

    const whoami = `${localStorage.getItem('user_type')}_${localStorage.getItem('srl')}`;
    const [message, setMessage] = useState('');
    const [chatId, setChatId] = useState('');
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const [nextPageUrl, setNextPageUrl] = useState(null); // 다음 페이지 url
    const [messageLists, setMessageLists] = useState([]); // 메세지 리스트
    const [scrollHeight, setScrollHeight] = useState(0);
    const [isFirst, setIsFirst] = useState(true);

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        if(isFirst){

            if(typeof match.params.chat_id !== "undefined"){

                setChatId(match.params.chat_id);
            }
        }

        if(chatId !== ""){
            const interval = setInterval(() => {
                getMessageLists();
            }, isFirst === true ? 0 : 7000);// 11000

            return () => clearInterval(interval)
        }

    }, [isFirst, chatId]);

    const getMessageLists = () => {

        if(isFirst){
            setIsFirst(false);
        }

        API.getMessageLists(chatId, 1).then((res) => {

            setNextPageUrl(res.next_page_url);
            setMessageLists([]);
            const newMessages = res.data.reverse().map((chat) => {

                return {
                    position: whoami === chat.from ? 'right' : 'left',
                    type: 'text',
                    text: chat.message,
                    date: new Date(chat.created_at)
                };
            });
            setMessageLists(messageLists => messageLists.concat(newMessages));

            if(containerRef.current !== null){
                scrollTo(containerRef.current.scrollHeight);
            }

        });
    }

    function scrollTo(height)
    {

        if(height !== null){}
        window.scrollTo(0, height);
        setScrollHeight(containerRef.current.scrollHeight);
    }

    const hasMoreMessage = () => {

        API.getBasicNextPage(nextPageUrl).then((res) => {

            let beforeMessage = [];
            let moreMessages = res.data.map(chat => {

                return {
                    position: whoami === chat.from ? 'right' : 'left',
                    type: 'text',
                    text: chat.message,
                    date: new Date(chat.created_at)
                };
            });
            beforeMessage.unshift(moreMessages);
            setNextPageUrl(res.next_page_url);
            setMessageLists(messageLists => beforeMessage.concat(messageLists));
            scrollTo(containerRef.current.scrollHeight-scrollHeight);
        }, []);
    }

    const onSendMessage = () => {

        if (typeof location.state === 'undefined') {
            history.push('/');
            return false;
        }

        if (message !== '') {

            let formData = new FormData();
            formData.append('to', location.state.userInfo);
            formData.append('chat_lists_id', chatId);
            formData.append('from', `${localStorage.getItem('user_type')}_${localStorage.getItem('srl')}`);
            formData.append('message', message);

            API.sendMessage(formData).then((res) => {

                if(res.stat > 0){
                    alert(res.error.message);
                    return false;
                }

                let newMessage = {
                    // avatar: 'http://image.news1.kr/system/photos/2018/3/29/3036479/article.jpg',
                    position: whoami === res.from ? 'right' : 'left',
                    type: 'text',
                    text: res.message,
                    date: new Date(res.created_at)
                }
                inputRef.current.clear();
                setChatId(res.chat_lists_id);

                setMessageLists(messageLists => messageLists.concat(newMessage));
                scrollTo(containerRef.current.scrollHeight);
            });
        }
    };

    return (
        <div ref={containerRef} className={classNames('container', styles['in-container'], styles['chat'])}>

            <div className={styles['more']}>
            {
                nextPageUrl !== null ?
                <Button variant="secondary" onClick={() => hasMoreMessage()}><reactIconFa.FaArrowUp className={styles['main-icon']}/>더 보기</Button> :
                ''
            }
            <hr/>
            </div>
            {
                messageLists.length > 0 ?
                    <MessageList
                        className={classNames('message-list', styles['chat-container'])}
                        lockable={true}
                        toBottomHeight={'100%'}
                        dataSource={messageLists}/>
                        :
                    <div className={styles['empty-content']}>
                        <reactIconFa.FaCommentDots/>

                    </div>
            }
            <hr/>
            <Input
                ref={inputRef}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메세지를 입력하세요."
                multiline={true}
                minHeight={100}
                maxHeight={100}
                rightButtons={
                    <Btn
                        onClick={onSendMessage}
                        color='white'
                        backgroundColor='black'
                        text='보내기'/>
                }/>
        </div>
    )

}
