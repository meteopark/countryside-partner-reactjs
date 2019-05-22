import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActionsOpenApi from '../../actions/openapi';
import styles from './Machine.module.scss';
import {Col, Button, Form, Table} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";


class Machine extends Component {

    constructor(props) {

        super(props);

        this.state = {
            search: {
                ctprvn: '충청남도',
                fch_knd: '',
            }
        }
    }


    handleSearch = () => {

        this.props.actionMachine.machineLists(this.state.search);
    }

    handleChange = (e) => {

        const search = {...this.state.search};
        search[e.target.name] = e.target.value;
        this.setState({search});
    }


    render() {

        const machines = this.props.mapStateToMachine.lists.filter(m => m.ROW_NUM);

        return (

            <div className={classNames('container', styles['in-container'])}>
                <p className={styles['header-container']}>
                    <reactIconFa.FaTractor className={styles['main-icon']}/>
                    전국 농기계 현황
                </p>
                <Form.Row>
                    <Col sm={2}>
                        {/*<Form.Label>지역</Form.Label>*/}
                        <Form.Control name="ctprvn" as="select" onChange={this.handleChange}>
                            <option value="충청남도">충청남도</option>
                            <option value="충청북도">충청북도</option>
                            <option value="전라남도">전라남도</option>
                            <option value="전라북도">전라북도</option>
                            <option value="경상남도">경상남도</option>
                            <option value="경상북도">경상북도</option>
                            <option value="세종특별자치시">세종특별자치시</option>
                            <option value="서울특별시">서울특별시</option>
                            <option value="부산광역시">부산광역시</option>
                            <option value="대구광역시">대구광역시</option>
                            <option value="인천광역시">인천광역시</option>
                            <option value="광주광역시">광주광역시</option>
                            <option value="대전광역시">대전광역시</option>
                            <option value="울산광역시">울산광역시</option>
                            <option value="경기도">경기도</option>
                            <option value="강원도">강원도</option>
                            <option value="제주특별자치도">제주특별자치도</option>
                        </Form.Control>
                    </Col>

                    <Col sm={2}>
                        {/*<Form.Label>농기계 구분</Form.Label>*/}
                        <Form.Control name="fch_knd" as="select" onChange={this.handleChange}>
                            <option value="">전체</option>
                            <option value="동력경운기">동력경운기</option>
                            <option value="농용트랙터">농용트랙터</option>
                            <option value="스피드스프레이어">스피드스프레이어</option>
                            <option value="동력이앙기">동력이앙기</option>
                            <option value="관리기">관리기</option>
                            <option value="콤바인">콤바인</option>
                            <option value="곡물건조기">곡물건조기</option>
                            <option value="농산물건조기">농산물건조기</option>
                        </Form.Control>
                    </Col>
                    &nbsp;&nbsp;<Button variant="secondary" onClick={this.handleSearch}>
                    <reactIconFa.FaSearch className={styles['icons']}/>
                    조회</Button>
                </Form.Row>
                <p className={styles['source']}>농림축산식품 공공데이터포털 OpenAPI (2014년 기준)</p>
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
                                <td>{m.HOLD_STTUS.toLocaleString(navigator.language, {minimumFractionDigits: 0})}</td>
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

        this.props.actionMachine.machineLists(this.state.search);
    }
}

const mapStateToProps = (state) => ({

    mapStateToMachine: state.machine,
})

const mapDispatchToProps = (dispatch) => ({

    actionMachine: bindActionCreators(importActionsOpenApi, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Machine);
