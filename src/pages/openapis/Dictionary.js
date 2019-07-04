import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActionsOpenApi from '../../actions/openapi';
import styles from './OpenApis.module.scss';
import {Col, Button, Form, Spinner} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import {DictionaryMobile} from "./DictionaryMobile";
import {DictionaryPC} from "./DictionaryPC";


class Dictionary extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isMobile: false,
            loading: false,
            cl_nm: '농업기반',
        }
        this.resize = this.resize.bind(this);
    }


    handleSearch = () => {
        this.setState({loading: true})
        this.props.actionDictionary.dictionaryLists(this.state.cl_nm);
    }

    handleChange = (e) => {

        this.setState({cl_nm: e.target.value});
    }

    resize(){
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav !== this.state.isMobile) {
            this.setState({isMobile: currentHideNav});
        }
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
                    {this.state.loading === true ?
                        <Spinner
                            className={styles['custom-spinner']}
                            animation="grow"
                            variant="danger"
                        />
                        : ""
                    }
                </Form.Row>
                <p className={styles['source']}>농림축산식품 공공데이터포털 OpenAPI (우리말 농업용어)</p>

                {
                    this.state.isMobile ?
                        <DictionaryMobile dictionary={dictionary}/> :
                        <DictionaryPC dictionary={dictionary}/>
                }


            </div>
        );
    }

    componentDidMount() {
        this.setState({loading: true});
        this.props.actionDictionary.dictionaryLists(this.state.cl_nm);

        window.addEventListener("resize", this.resize, false);
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

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize, false);
    }
}

const mapStateToProps = (state) => ({

    mapStateToDictionary: state.openapi,
})

const mapDispatchToProps = (dispatch) => ({

    actionDictionary: bindActionCreators(importActionsOpenApi, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
