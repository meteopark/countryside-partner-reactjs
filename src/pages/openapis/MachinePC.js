import React from 'react';
import styles from './OpenApis.module.scss';
import {Table} from 'react-bootstrap';
import classNames from "classnames";

export function MachinePC({machines}) {

    return (

        <div>
            <Table responsive="sm" className={classNames("text-center", styles['table'])}>
                <thead>
                <tr className={styles['table-thead']}>
                    <th width={"10%"}>순번</th>
                    <th width={"18%"}>지역</th>
                    <th>기종</th>
                    <th width={"20%"}>기종상세</th>
                    <th width={"18%"}>보유현황</th>
                </tr>
                </thead>
                <tbody>
                {machines.length > 0 ?
                    machines.map((m, i) => (

                        <tr key={i}>
                            <td>{m.ROW_NUM}</td>
                            <td>{m.CTPRVN}</td>
                            <td>{m.FCH_KND}</td>
                            <td>{m.FCH_KND_DETAIL}</td>
                            <td>{m.HOLD_STTUS ? m.HOLD_STTUS.toLocaleString(navigator.language, {minimumFractionDigits: 0}) : 0}</td>
                        </tr>
                    ))
                    :
                    <tr>
                        <td colSpan={5} className={styles['empty-content']}>해당 기종이 존재하지 않습니다.</td>
                    </tr>
                }
                </tbody>
            </Table>
        </div>
    );

}