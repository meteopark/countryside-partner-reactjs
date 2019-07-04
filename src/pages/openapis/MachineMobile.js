import React from 'react';
import styles from './OpenApis.module.scss';
import {Col, Row} from 'react-bootstrap';

export function MachineMobile({machines}) {

    return (

        <div>
            <hr/>
            {machines.length > 0 ?
                machines.map((machine, i) => (

                    <Row key={i}>
                        <Col className={styles['m-row']}>
                            <span>[{machine.CTPRVN}]</span>&nbsp;{machine.FCH_KND} ({machine.FCH_KND_DETAIL})
                            <br/>
                            <div className={styles['m-money']}>보유현황 -
                                {machine.HOLD_STTUS ? machine.HOLD_STTUS.toLocaleString(navigator.language, {minimumFractionDigits: 0}) : 0}
                            </div>
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