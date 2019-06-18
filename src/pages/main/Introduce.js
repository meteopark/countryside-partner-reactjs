import React from 'react';
import classNames from "classnames";
import styles from "../inc/Header.module.scss";



export function Introduce() {

    return (
        <div className={classNames('container', styles['in-container'])}>
            시골짝꿍은 농업사회 발전을 이루기 위해 해당 분야의 전문가인 멘토와 귀농을 희망하는 멘티를 이어주는 플랫폼 입니다.
        </div>
    );
}
