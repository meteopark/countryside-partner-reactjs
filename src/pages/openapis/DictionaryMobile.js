import React from 'react';
import styles from './OpenApis.module.scss';
import {Col, Row} from 'react-bootstrap';

export function DictionaryMobile({dictionary}) {

    return (

        <div>
            <hr/>
            {dictionary.length > 0 ?
                dictionary.map((d, i) => (

                    <Row key={i}>
                        <Col className={styles['m-row']}>
                            <span>[{d.CL_NM}]</span>&nbsp;{d.LEGACY_WORD_NM} = {d.SRCLANG_NM} = {d.EASY_WORD_NM}
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