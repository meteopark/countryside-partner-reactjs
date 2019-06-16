import React, {Component, useState, useEffect} from 'react';
import API from "../api/api";
import classNames from "classnames";
import styles from "../diaries/Diary.module.scss";



export function Chat() {

    const [data, setData] = useState(null);

    useEffect(() => {

        API.getOpenApiChatIntro().then((response) => {

            setData(response.text);
        });
    }, []);


    return (
        <div className={classNames('container', styles['blog-container'])}>
            <div dangerouslySetInnerHTML={ {__html: data} }></div>
        </div>
    )

}