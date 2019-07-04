import React from 'react';
import styles from './OpenApis.module.scss';
import {Col, Row} from 'react-bootstrap';

export function SpecialCropsMobile({scrops}) {

    return (

        <div>
            <hr/>
            {scrops.length > 0 ?
                scrops.map((sc, i) => (

                    <Row key={i}>
                        <Col className={styles['m-row']}>
                            <span>[{sc.CPCLPR_CL}]</span>&nbsp;{sc.PRDLST_NM}<br/>
                            <div className={styles['m-sub-title']}>
                                <ul>
                                    <li>재배 농가수 : <span>{sc.FRMHS_CO} (호)</span></li>
                                    <li>재배면적 : <span>{sc.CTVT_AR} (ha)</span></li>
                                    <li>수확면적 : <span>{sc.HARVEST_AR} (ha)</span></li>
                                    <li>단위면적당 수확량 : <span>{sc.UNIT_AR_HARVEST_QY} (kg/10a)</span></li>
                                    <li>생산량 : <span>{sc.PRDCTN_QY} (M/T)</span></li>
                                </ul>
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