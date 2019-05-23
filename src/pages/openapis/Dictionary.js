import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActionsOpenApi from '../../actions/openapi';
import styles from './OpenApis.module.scss';
import {Col, Button, Form, Table} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";


class Dictionary extends Component {

    constructor(props) {

        super(props);

        this.state = {
            cl_nm: '농업기반',
        }
    }


    handleSearch = () => {

        this.props.actionDictionary.dictionaryLists(this.state.cl_nm);
    }

    handleChange = (e) => {

        this.setState({cl_nm: e.target.value});
    }


    render() {

        const dictionary = this.props.mapStateToDictionary.lists.filter(d => d.ROW_NUM);

        return (

            <div className={classNames('container', styles['in-container'])}>
                <p className={styles['header-container']}>
                    <reactIconFa.FaBook className={styles['main-icon']}/>
                    우리말 농업용어
                </p>
                <Form.Row>
                    <Col sm={2}>
                        {/*<Form.Label>지역</Form.Label>*/}
                        <Form.Control name="cl_nm" as="select" onChange={this.handleChange}>
                            <option value="농업기반">농업기반</option>
                            <option value="농작물">농작물</option>
                            <option value="재배기술">재배기술</option>
                            <option value="축산">축산</option>
                        </Form.Control>
                    </Col>
                    &nbsp;&nbsp;<Button variant="secondary" onClick={this.handleSearch}>
                    <reactIconFa.FaSearch className={styles['icons']}/>
                    조회</Button>
                </Form.Row>
                <p className={styles['source']}>농림축산식품 공공데이터포털 OpenAPI (우리말 농업용어)</p>
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
                            <td colSpan={5} className={styles['empty-content']}>해당 기종이 존재하지 않습니다.</td>
                        </tr>
                    }

                    </tbody>
                </Table>


            </div>
        );
    }

    componentDidMount() {

        this.props.actionDictionary.dictionaryLists(this.state.cl_nm);
    }
}

const mapStateToProps = (state) => ({

    mapStateToDictionary: state.openapi,
})

const mapDispatchToProps = (dispatch) => ({

    actionDictionary: bindActionCreators(importActionsOpenApi, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
