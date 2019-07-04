import React from 'react';
import styles from './OpenApis.module.scss';
import {Table} from 'react-bootstrap';
import classNames from "classnames";

export function SpecialCropsPC({scrops}) {

    return (

        <div>
            <Table responsive="sm" className={classNames("text-center", styles['table'])}>
                <thead>
                <tr className={styles['table-thead-min']}>
                    <th width={"10%"}>순번</th>
                    <th width={"13%"}>특용작물 분류</th>
                    <th>세부 품목명</th>
                    <th width={"10%"}>재배 농가수<br/>(호)</th>
                    <th width={"10%"}>재배면적<br/>(ha)</th>
                    <th width={"10%"}>수확면적<br/>(ha)</th>
                    <th width={"16%"}>단위면적당 수확량<br/>(kg/10a)</th>
                    <th width={"10%"}>생산량<br/>(M/T)</th>
                </tr>
                </thead>
                <tbody>

                <tr className={styles['no-underline']}>

                </tr>
                {scrops.length > 0 ?

                    scrops.map((sc, i) => (

                        <tr key={i}>
                            <td>{sc.ROW_NUM}</td>
                            <td>{sc.CPCLPR_CL}</td>
                            <td>{sc.PRDLST_NM}</td>
                            <td>{sc.FRMHS_CO}</td>
                            <td>{sc.CTVT_AR}</td>
                            <td>{sc.HARVEST_AR}</td>
                            <td>{sc.UNIT_AR_HARVEST_QY}</td>
                            <td>{sc.PRDCTN_QY}</td>
                        </tr>
                    ))
                    :
                    <tr>
                        <td colSpan={8} className={styles['empty-content']}>
                            요청하신 특용작물이 존재하지 않습니다.
                        </td>
                    </tr>
                }

                </tbody>
            </Table>
        </div>
    );

}