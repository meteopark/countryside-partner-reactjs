import React, {Component} from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import * as importActionsOpenApi from '../../actions/openapi';
import styles from './OpenApis.module.scss';
import {Col, Button, Form, Table, Spinner} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import {withAlert} from "react-alert";
import {SpecialCropsPC} from "./SpecialCropsPC";
import {DictionaryMobile} from "./DictionaryMobile";
import {DictionaryPC} from "./DictionaryPC";
import {SpecialCropsMobile} from "./SpecialCropsMobile";

class SpecialCrops extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isMobile: false,
            loading: false,
            search: {
                year: '2011',
                ctprvn: '제주특별자치도',
            }
        }
    }


    handleSearch = () => {

        this.setState({loading: true});
        this.props.requestAction.specialCropsLists(
            this.state.search.year,
            this.state.search.ctprvn
        );
    }

    handleChange = (e) => {

        const search = {...this.state.search};
        search[e.target.name] = e.target.value;
        this.setState({search});
    }

    resize(){
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav !== this.state.isMobile) {
            this.setState({isMobile: currentHideNav});
        }
    }

    render() {

        const years = [2011, 2010, 2009, 2008];

        const scrops = this.props.mapStateToPropsSpecialCrops.lists.filter(m => m.ROW_NUM);

        return (

            <div className={classNames('container', styles['in-container'])}>

                <p className={styles['header-container']}>
                    <reactIconFa.FaTractor className={styles['main-icon']}/>
                    연도별 특용작물 생산 통계
                </p>
                <Form.Row>
                    <Col sm={2}>
                        <Form.Control name="year" as="select" onChange={this.handleChange}>
                            {years.map((y, i) => (
                                <option key={i} value={y}>{y}년</option>
                            ))}
                        </Form.Control>
                    </Col>

                    <Col sm={2}>
                        {/*<Form.Label>지역</Form.Label>*/}
                        <Form.Control name="ctprvn" as="select" onChange={this.handleChange}>
                            <option value="제주특별자치도">제주특별자치도</option>
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
                <p className={styles['source']}>농림축산식품 공공데이터포털 OpenAPI (특용작물 생산 통계)</p>

                {
                    this.state.isMobile ?
                        <SpecialCropsMobile scrops={scrops}/> :
                        <SpecialCropsPC scrops={scrops}/>
                }



            </div>
        );
    }

    componentDidMount() {
        this.setState({loading: true});
        this.props.requestAction.specialCropsLists(2011, '충청남도');

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
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

    mapStateToPropsSpecialCrops: state.openapi,
})

const mapDispatchToProps = (dispatch) => ({

    requestAction: bindActionCreators(importActionsOpenApi, dispatch),
})

export default compose(withAlert(), connect(mapStateToProps, mapDispatchToProps))(SpecialCrops);
