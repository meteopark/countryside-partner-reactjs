import React from 'react';
import classNames from "classnames";
import styles from "../inc/Header.module.scss";

export function Introduce() {

    return (
        <div className={classNames('container', styles['in-container-introduce'])}>
            <br/><hr/>
            <h2 className="text-center">본 서비스는 농업사회 발전을 이루기 위해<br/>해당 분야의 전문가와 예비 귀농인을 이어주는 플랫폼 입니다.</h2>
            <hr/><br/>
            <img src="/images/bg/introduce_human.jpg" className={styles['introduce-image']}/><br/><br/>
            <p>
                2013년도 이후 귀농에 대한 관심이 커짐으로써 더 이상 귀농은 특별한 사람들만의 직업이 아니게 되었습니다.<br/><br/>
                정부에서는 영농정착지원금과 농지확보 등 다양한 지원 사업을 통해 농업인력 확충에 힘을 쏟았습니다.<br/><br/>
                그 결과, 2017년 귀농 귀촌인구가 <b>50만 명</b>을 돌파하게 되었습니다.<br/><br/>
                하지만 역귀농 현상이 발생되면서 농업 생태계를 이루기에는 어려운 점이 나타났습니다.<br/><br/>
                가장 큰 이유로 <b>영농실패</b>라는 것이었는데, 이는 충분한 사전조사와 준비가 없이 귀농을 하였기 때문에 나타냈습니다.<br/><br/>
                성공적인 귀농을 위해 신규농의 비율을 높이기 위해서는 무엇보다 많은 <b>관심</b>이 필요합니다.<br/><br/>
                귀농에 관심이 있고, 준비 중인 예비 귀농인에게는 <b>올바른 지식</b>을 전달하고, 해당 분야의 전문가는 <b>지도(mentoring)</b>를 함으로써<br/><br/>
                불안정한 농업 생태계가 잘 자리 잡을 수 있도록 기여하는 것이 본 서비스가 추구하는 길입니다.<br/><br/>
                농업이라는 직업에 많은 관심을 가져주시길 바랍니다.<br/><br/>
                고맙습니다<br/><br/>
            </p>
            <hr/>
            <p className="text-center">
                <h2>시골짝꿍</h2>
            </p>
        </div>
    );
}
