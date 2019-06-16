import React, {Component} from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import * as importActionsOpenApi from '../../actions/openapi';
import styles from './OpenApis.module.scss';
import {Col, Button, Form, Table, Spinner, Modal} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import {withAlert} from "react-alert";

    class EmptyHouses extends Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: false,
            house: {
                sidonm: '제주특별자치도',
                dealtypecd: 'DLTC01',
                gubuncd: 'F',
            },
            lgShow: false,
            modal: {
                addr: null,
                DEAL_AMOUNT: null,
                DEAL_BIGO: null,
                BUILDING_AREA: null,
                AREA_ETC: null,
                BUILD_YEAR: null,
                VACANT_YEAR: null,
                STRUCT_TYPE	: null,
                OWNER_NM: null,
                OWNER_CONTACT: null,
                INSPECTOR: null,
                LOT_AREA: null,
                BIGO: null,
                FILE_PATH1: null,
                FILE_PATH2: null,
                FILE_PATH3: null,
                DETAIL_URL: null,
                DEAL_NEGO_YN: null,
                LEASE_AMOUNT: null,
                RENT_AMOUNT: null,
                GUBUN: null,
                DEAL_TYPE: null,
                REG_DT: null,
                MODI_DT: null
            }
        }
    }

    handleModal = (house) => {
        this.setState({
            lgShow: true,
            modal: {
                addr: (`${house.SIDO_NM} ${house.SIGUN_NM} ${house.ADDR}`),
                DEAL_AMOUNT: house.DEAL_AMOUNT,
                DEAL_BIGO: house.DEAL_BIGO,
                BUILDING_AREA: house.BUILDING_AREA,
                AREA_ETC: house.AREA_ETC,
                BUILD_YEAR: house.BUILD_YEAR,
                VACANT_YEAR: house.VACANT_YEAR,
                STRUCT_TYPE	: house.STRUCT_TYPE	,
                OWNER_NM: house.OWNER_NM,
                OWNER_CONTACT: house.OWNER_CONTACT,
                INSPECTOR: house.INSPECTOR,
                LOT_AREA: house.LOT_AREA,
                BIGO: house.BIGO,
                FILE_PATH1: house.FILE_PATH1,
                FILE_PATH2: house.FILE_PATH2,
                FILE_PATH3: house.FILE_PATH3,
                DETAIL_URL: house.DETAIL_URL,
                DEAL_NEGO_YN: house.DEAL_NEGO_YN,
                LEASE_AMOUNT: house.LEASE_AMOUNT,
                RENT_AMOUNT: house.RENT_AMOUNT,
                GUBUN: house.GUBUN,
                DEAL_TYPE: house.DEAL_TYPE,
                REG_DT: house.REG_DT,
                MODI_DT: house.MODI_DT
            }
        });

    }
    handleSearch = () => {

        this.setState({loading: true});
        this.props.requestAction.emptyHousesLists(
            this.state.house.sidonm,
            this.state.house.gubuncd,
            this.state.house.dealtypecd
        );
    }

    handleChange = (e) => {

        const house = {...this.state.house};
        house[e.target.name] = e.target.value;
        this.setState({house});
    }


    render() {

        const areas = [
            '제주특별자치도', '충청남도', '충청북도', '전라남도', '전라북도',
            '경상남도', '경상북도', '세종특별자치시', '서울특별시', '부산광역시',
            '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시',
            '경기도', '강원도'
        ];

        const deal_type = [
            ['DLTC01', '매매'],
            ['DLTC02','임대(전세)'],
            ['DLTC03', '임대(월세)'],
            ['DLTC04', '협의 후 결정'],
            ['DLTC05', '무료임대']
        ];

        const house_type = [
          ['F', '농지'], ['U', '빈집']
        ];

        const houses = this.props.mapStateToPropsEmptyHouses.lists.filter(m => m.ROW_NUM);

        let lgClose = () => this.setState({ lgShow: false });

        return (

            <div className={classNames('container', styles['in-container'])}>

                <Modal
                    size="lg"
                    show={this.state.lgShow}
                    onHide={lgClose}
                    aria-labelledby="modals"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="modals">
                            상세정보
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table borderless="false" responsive="sm" className={styles['modal']}>
                            <tbody>
                            <tr><td className={styles['modal-td']}>주소</td><td className={styles['modal-td-contents']}>{this.state.modal.addr}</td></tr>
                            <tr><td className={styles['modal-td']}>이미지</td><td className={styles['modal-td-contents']}>
                                <img src={this.state.modal.FILE_PATH1} className={styles['image']}/>
                                <img src={this.state.modal.FILE_PATH2} className={styles['image']}/>
                                <img src={this.state.modal.FILE_PATH3} className={styles['image']}/>
                            </td></tr>
                            <tr><td className={styles['modal-td']}>희망매매가격</td><td className={styles['modal-td-contents']}>{!isNaN(this.state.modal.DEAL_AMOUNT*1) ? (this.state.modal.DEAL_AMOUNT*1).toLocaleString(navigator.language, {minimumFractionDigits: 0})+"원" : this.state.modal.DEAL_AMOUNT}</td></tr>
                            <tr><td className={styles['modal-td']}>전세희망가격</td><td className={styles['modal-td-contents']}>{this.state.modal.LEASE_AMOUNT}</td></tr>
                            <tr><td className={styles['modal-td']}>월세희망가격</td><td className={styles['modal-td-contents']}>{this.state.modal.RENT_AMOUNT}</td></tr>
                            <tr><td className={styles['modal-td']}>거래참고 사항</td><td className={styles['modal-td-contents']}>{this.state.modal.DEAL_BIGO}</td></tr>
                            <tr><td className={styles['modal-td']}>건물 면적(㎡)</td><td className={styles['modal-td-contents']}>{this.state.modal.BUILDING_AREA}</td></tr>
                            <tr><td className={styles['modal-td']}>대지 면적(㎡)</td><td className={styles['modal-td-contents']}>{this.state.modal.LOT_AREA}</td></tr>
                            <tr><td className={styles['modal-td']}>기타 면적</td><td className={styles['modal-td-contents']}>{this.state.modal.AREA_ETC}</td></tr>
                            <tr><td className={styles['modal-td']}>건축년도</td><td className={styles['modal-td-contents']}>{this.state.modal.BUILD_YEAR}</td></tr>
                            <tr><td className={styles['modal-td']}>빈집발생시기</td><td className={styles['modal-td-contents']}>{this.state.modal.VACANT_YEAR}</td></tr>
                            <tr><td className={styles['modal-td']}>주택구조</td><td className={styles['modal-td-contents']}>{this.state.modal.STRUCT_TYPE}</td></tr>
                            <tr><td className={styles['modal-td']}>소유주명</td><td className={styles['modal-td-contents']}>{this.state.modal.OWNER_NM}</td></tr>
                            <tr><td className={styles['modal-td']}>소유주연락처</td><td className={styles['modal-td-contents']}>{this.state.modal.OWNER_CONTACT}</td></tr>
                            <tr><td className={styles['modal-td']}>정보제공자</td><td className={styles['modal-td-contents']}>{this.state.modal.INSPECTOR}</td></tr>
                            <tr><td className={styles['modal-td']}>참고사항</td><td className={styles['modal-td-contents']}>{this.state.modal.BIGO}</td></tr>
                            <tr><td className={styles['modal-td']}>상세보기</td><td className={styles['modal-td-contents']}>{ this.state.modal.DETAIL_URL === "" ? "" :<a href={this.state.modal.DETAIL_URL} target="_blank">바로가기</a>}</td></tr>
                            <tr><td className={styles['modal-td']}>거래협의가능여부</td><td className={styles['modal-td-contents']}>{this.state.modal.DEAL_NEGO_YN}</td></tr>
                            <tr><td className={styles['modal-td']}>빈집 농지 구분</td><td className={styles['modal-td-contents']}>{this.state.modal.GUBUN}</td></tr>
                            <tr><td className={styles['modal-td']}>거래종류</td><td className={styles['modal-td-contents']}>{this.state.modal.DEAL_TYPE}</td></tr>
                            <tr><td className={styles['modal-td']}>등록일</td><td className={styles['modal-td-contents']}>{this.state.modal.REG_DT}</td></tr>
                            <tr><td className={styles['modal-td']}>수정일</td><td className={styles['modal-td-contents']}>{this.state.modal.MODI_DT}</td></tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                </Modal>






                <p className={styles['header-container']}>
                    <reactIconFa.FaHome className={styles['main-icon']}/>
                    농촌 빈집 정보
                </p>
                <Form.Row>
                    <Col sm={2}>
                        <Form.Control name="sidonm" as="select" onChange={this.handleChange}>
                            {areas.map((area, i) => (
                                <option key={i} value={area}>{area}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col sm={2}>
                        <Form.Control name="dealtypecd" as="select" onChange={this.handleChange}>
                            {deal_type.map((deal, i) => (
                                <option key={i} value={deal[0]}>{deal[1]}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col sm={2}>
                        <Form.Control name="gubuncd" as="select" onChange={this.handleChange}>
                            {house_type.map((house, i) => (
                                <option key={i} value={house[0]}>{house[1]}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    &nbsp;&nbsp;
                    <Button variant="secondary" onClick={this.handleSearch}>
                        <reactIconFa.FaSearch className={styles['icons']}/>조회
                    </Button>
                    {this.state.loading === true ?
                        <Spinner
                            className={styles['custom-spinner']}
                            animation="grow"
                            variant="danger"
                        />
                        : ""
                    }
                </Form.Row>
                <p className={styles['source']}>농림축산식품 공공데이터포털 OpenAPI (농촌빈집정보)</p>
                <Table responsive="sm" className={classNames("text-center", styles['table'])}>
                    <thead>
                    <tr className={styles['table-thead-min']}>
                        <th width={"5%"}>순번</th>
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

                            <tr key={i} onClick={() => this.handleModal(house)}>
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

    componentDidMount() {
        this.setState({loading: true});
        this.props.requestAction.emptyHousesLists(
            this.state.house.sidonm,
            this.state.house.gubuncd,
            this.state.house.dealtypecd
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /*
        이 API는 컴포넌트에서 render() 를 호출하고난 다음에 발생하게 됩니다. 이 시점에선 this.props 와 this.state 가 바뀌어있습니다.
        그리고 파라미터를 통해 이전의 값인 prevProps 와 prevState 를 조회 할 수 있습니다.
        그리고, getSnapshotBeforeUpdate 에서 반환한 snapshot 값은 세번째 값으로 받아옵니다.
         */
        if (prevState.loading === true) {
            this.setState({loading: false})
        }
    }
}

const mapStateToProps = (state) => ({

    mapStateToPropsEmptyHouses: state.openapi,
})

const mapDispatchToProps = (dispatch) => ({

    requestAction: bindActionCreators(importActionsOpenApi, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(EmptyHouses);
