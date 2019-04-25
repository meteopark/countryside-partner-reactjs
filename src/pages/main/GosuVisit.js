import React, {Component} from 'react';
import {Card, CardColumns, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import styles from './Main.module.scss';
import classNames from 'classnames';


export class GosuVisit extends Component {

    constructor(props){
        super(props);
    }
    render() {

        return (
            <div className={classNames('container', styles['in-container'])}>
                <h5>
                    <div className={styles['sub-title']}>멘토를 소개 합니다</div>
                </h5>
                <CardColumns>
                    {this.props.mains.lists.map((village, i) => (

                        <Card key={i}>
                            <Link className={styles['link']} to={`/villages/${village.VILAGE_ID}`}>
                                <div className={styles['image-container']}>
                                    <Card.Img variant="top" className={styles['image-blank']} src={village.THUMB_URL_COURS1 ? village.THUMB_URL_COURS1 : '/images/no-image.png' } />
                                    <Badge pill variant="success" className={styles['tag']} >{village.THEMA_NM}</Badge>
                                </div>
                                <Card.Body>
                                    <Card.Title>{village.VILAGE_NM}</Card.Title>
                                    <Card.Text>
                                        {village.VILAGE_SLGN}
                                    </Card.Text>
                                </Card.Body>
                            </Link>
                        </Card>
                     ))}
                </CardColumns>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

    mains: state.mains // state.mains 는 reducers/Village.jsjs 의 키값과 같아야 한다
})

export default connect(mapStateToProps)(GosuVisit);

