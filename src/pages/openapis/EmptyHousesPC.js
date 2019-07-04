import React from 'react';
import styles from './OpenApis.module.scss';
import {Table} from 'react-bootstrap';
import classNames from "classnames";

export function EmptyHousesPC({houses, handleModal}) {

    return (

        <div>
            <Table responsive="sm" className={classNames("text-center", styles['table'])}>
                <thead>
                <tr className={styles['table-thead-min']}>
                    <th width={"10%"}>순번</th>
                    <th width={"40%"}>주소</th>
                    <th>거래 참고사항</th>
                    <th width={"15%"}>희망매매가격</th>
                </tr>
                </thead>
                <tbody>

                <tr className={styles['no-underline']}>

                </tr>
                {houses.length > 0 ?
                    houses.map((house, i) => (
                        <tr key={i} onClick={() => handleModal(house)}>
                            <td className={classNames(styles['pointer'], styles['table-td-min'])}>{house.ROW_NUM}</td>
                            <td className={classNames(styles['table-td-min'], styles['left'])}>{(`${house.SIDO_NM} ${house.SIGUN_NM} ${house.ADDR}`)}</td>
                            <td className={classNames(styles['table-td-min'], styles['left'])}>{house.DEAL_BIGO}</td>
                            <td className={styles['table-td-min']}>
                                {
                                  !isNaN(house.DEAL_AMOUNT*1) ?
                                      (house.DEAL_AMOUNT*1).toLocaleString(navigator.language, {minimumFractionDigits: 0})+"원" :
                                      house.DEAL_AMOUNT
                                }
                            </td>
                        </tr>
                    ))
                    :
                    <tr>
                        <td colSpan={4} className={styles['empty-content']}>
                            결과가 존재하지 않습니다.
                        </td>
                    </tr>
                }
                </tbody>
            </Table>
        </div>
    );

}