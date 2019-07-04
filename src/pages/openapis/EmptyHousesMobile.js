import React from 'react';
import styles from './OpenApis.module.scss';
import {Col, Row} from 'react-bootstrap';

export function EmptyHousesMobile({houses, handleModal}) {

    return (

        <div>
            <hr/>
                {houses.length > 0 ?
                    houses.map((house, i) => (

                        <Row key={i} onClick={() => handleModal(house)}>
                            <Col className={styles['m-row']}>
                                <span>[{house.GUBUN}]</span>&nbsp;{(`${house.SIDO_NM} ${house.SIGUN_NM} ${house.ADDR}`)}
                                <br/>
                                <div className={styles['m-money']}>희망매매가격 - {
                                    !isNaN(house.DEAL_AMOUNT*1) ?
                                        (house.DEAL_AMOUNT*1).toLocaleString(navigator.language, {minimumFractionDigits: 0})+"원" :
                                        house.DEAL_AMOUNT
                                }</div>
                            </Col>
                        </Row>
                    ))
                    :
                    <Row>
                        <Col className={styles['empty-content']}>
                            결과가 존재하지 않습니다.
                        </Col>
                    </Row>
                }
        </div>
    );

}