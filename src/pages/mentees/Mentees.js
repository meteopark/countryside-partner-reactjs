import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as importActions from '../../actions';
import styles from '../mentees/Mentees.module.scss';
import {Link} from 'react-router-dom';
import {CardColumns, Card} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";

class Mentees extends Component {

    render() {

        return (

            <div className={classNames('container', styles['in-container'])}>

                <p className={styles['header-container']}>
                    <reactIconFa.FaRegKissWinkHeart className={styles['main-icon']}/>
                    멘티소개
                </p>
                <CardColumns bsPrefix={'card-columns-custom'}>

                {this.props.mains.lists.map((m, i) => (

                    <Link className={classNames(styles['link'])} to={`/mentees/${m.mentee_srl}`} key={i}>
                        <Card className={styles['mentors-cards']}>
                            <Card.Body>
                                <Card.Title className={styles['mentors-title']}>{m.name}</Card.Title>
                                <Card.Text className={styles['mentors-contents']}>
                                    {m.introduce}<br/>
                                    <reactIconFa.FaRunning className={styles['icons']} />{m.crops}<br/>
                                    <reactIconFa.FaMapMarked className={styles['icons']} />{m.target_area}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                ))}
                </CardColumns>
            </div>
        );
    }

    componentDidMount() {

        const {getMains} = this.props;
        getMains.menteeLists();
    }
}

const mapStateToProps = (state) => ({

    mains: state.mains
})

const mapDispatchToProps = (dispatch) => ({

    getMains: bindActionCreators(importActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentees);
