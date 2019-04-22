import React, {Component} from 'react';
import {Card, CardColumns } from 'react-bootstrap';
import {connect} from "react-redux";
import styles from './Main.module.scss';
import classNames from 'classnames';


export class VillageVisit extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        return (
            <div className={classNames('container', styles['in-container'])}>
                <h5>
                    <div className={styles['sub-title']}>우리마을에 놀러와요</div>
                </h5>
                <CardColumns>
                    {this.props.mains.lists.map((village, i) => (

                        <Card key={i}>
                            <Card.Img variant="top" src={village.THUMB_URL_COURS1} />
                            <Card.Body>
                                <Card.Title>{village.VILAGE_NM}</Card.Title>
                                <Card.Text>
                                    {village.VILAGE_SLGN}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                     ))}
                </CardColumns>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

    mains: state.mains // state.mains 는 reducers/index.js 의 키값과 같아야 한다
})

export default connect(mapStateToProps)(VillageVisit);

