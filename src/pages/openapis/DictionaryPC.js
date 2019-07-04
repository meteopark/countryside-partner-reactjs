import React from 'react';
import styles from './OpenApis.module.scss';
import {Table} from 'react-bootstrap';
import classNames from "classnames";

export function DictionaryPC({dictionary}) {

    return (

        <div>
            <Table responsive="sm" className={classNames("text-center", styles['table'])}>
                <thead>
                <tr className={styles['table-thead']}>
                    <th width={"10%"}>순번</th>
                    <th width={"18%"}>분류</th>
                    <th width={"20%"}>기존용어</th>
                    <th width={"20%"}>한자어(원어)</th>
                    <th>쉬운용어</th>
                </tr>
                </thead>
                <tbody>
                {dictionary.length > 0 ?
                    dictionary.map((d, i) => (

                        <tr key={i}>
                            <td>{d.ROW_NUM}</td>
                            <td>{d.CL_NM}</td>
                            <td>{d.LEGACY_WORD_NM}</td>
                            <td>{d.SRCLANG_NM}</td>
                            <td>{d.EASY_WORD_NM}</td>
                        </tr>
                    ))
                    :
                    <tr>
                        <td colSpan={5} className={styles['empty-content']}>해당 농업용어가 존재하지 않습니다.</td>
                    </tr>
                }

                </tbody>
            </Table>
        </div>
    );

}