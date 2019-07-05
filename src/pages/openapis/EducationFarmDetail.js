import React, {useState, useEffect} from 'react';
import styles from './OpenApis.module.scss';
import {Button, Table} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import API from "../api/api";
import history from '../history';

export function EducationFarmDetail({match}) {

    const [detailContents, setDetailContents] = useState('');

    useEffect(() => { // 렌더링 될때마다 실행되는 Hook

        getOpenApiEducationFarmDetail(match.params.cntntsNo);
    }, []);

    const goBack = () => {
        history.goBack();
    }

    const getOpenApiEducationFarmDetail = (cntntsNo) => {

        API.getOpenApiEducationFarmDetail(cntntsNo).then((res) => {

            let contents = (

                <Table borderless="false" responsive="sm" className={styles['modal']}>
                    <tbody>
                    <tr><td className={styles['modal-td-g']}>농장명</td><td className={styles['modal-td-contents']}>{res.cntntsSj}</td></tr>
                    <tr><td className={styles['modal-td-g']}>주제</td><td className={styles['modal-td-contents']}>{res.thema}</td></tr>
                    <tr><td className={styles['modal-td-g']}>주소</td><td className={styles['modal-td-contents']}>{res.locplc}</td></tr>
                    <tr><td className={styles['modal-td-g']}>지정연도</td><td className={styles['modal-td-contents']}>{res.appnYear}</td></tr>
                    <tr><td className={styles['modal-td-g']}>홈페이지</td><td className={styles['modal-td-contents']}><a href={res.url} target="_blank" rel="noopener noreferrer" >{res.url}</a></td></tr>
                    <tr><td className={styles['modal-td-g']}>연락처</td><td className={styles['modal-td-contents']}>{res.telno}</td></tr>
                    <tr><td className={styles['modal-td-g']}>품질인증연도</td><td className={styles['modal-td-contents']}>{res.crtfcYearInfo}</td></tr>
                    <tr><td className={styles['modal-td-g']}>내용</td><td className={styles['modal-td-contents']}>{res.cn}</td></tr>

                    <tr><td className={styles['modal-td-g']}>주소 </td><td className={styles['modal-td-contents']}>
                        <img src={res.imgUrl1} className={styles['image']} alt="이미지"/>
                        <img src={res.imgUrl2} className={styles['image']} alt="이미지"/>
                        <img src={res.imgUrl3} className={styles['image']} alt="이미지"/>
                        <img src={res.imgUrl4} className={styles['image']} alt="이미지"/>
                        <img src={res.imgUrl5} className={styles['image']} alt="이미지"/>
                        <img src={res.imgUrl6} className={styles['image']} alt="이미지"/>
                    </td></tr>
                    </tbody>
                </Table>
            );
            setDetailContents(contents);
        });
    }

    return (

        <div className={classNames('container', styles['in-container'])}>
            <p className={styles['header-container']}>
                <reactIconFa.FaUserGraduate className={styles['main-icon']}/>
                전국 농촌 교육농장
            </p>
            <p className={styles['source']}>농촌진흥청 공공데이터포털 OpenAPI (농촌 교육농장)</p>
            <p className={styles['right-btn']}><Button size="sm" variant="secondary" onClick={goBack}><reactIconFa.FaList className={styles['icon']}/>목록보기</Button></p>
            <hr/>
            {detailContents}
        </div>
    );
}