import React, {Component} from 'react';
import styles from '../mentees/Mentees.module.scss';
import {Link} from 'react-router-dom';
import {CardColumns, Card, Spinner} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import API from "../api/api";

class Mentees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
            mentees: [],
            current_page: 1,
            last_page: 1,
        }
    }

    loadItems = () => {

        if (this.state.last_page <= this.state.current_page) this.setState({hasMore: false});

        this.getMentees(this.state.current_page + 1);
    }

    render() {

        return (

            <div className={classNames('container', styles['in-container'])}>

                <p className={styles['header-container']}>
                    <reactIconFa.FaRegKissWinkHeart className={styles['main-icon']}/>
                    멘티소개
                </p>
                <CardColumns bsPrefix={'card-columns-custom'}>

                    <InfiniteScroll
                        dataLength={this.state.mentees.length}
                        next={this.loadItems}
                        hasMore={this.state.mentees.length < 1 ? false : this.state.hasMore}
                        loader={<div><br/>
                            <div className={classNames("text-center", styles['infinite-loader'])}><Spinner
                                animation="border" variant="success"/></div>
                            <br/></div>}
                        endMessage={
                            <div className="text-center">
                                <img src="/images/ico/homi.png" className={styles['homi']} alt="호미"/>
                            </div>
                        }
                    >

                        {this.state.mentees.map((m, i) => (

                            <Link className={classNames(styles['link'])} to={`/mentees/${m.mentee_srl}`} key={i}>
                                <Card className={styles['mentors-cards']}>
                                    <Card.Body>
                                        <Card.Title className={styles['mentors-title']}>
                                            {m.profile_image ? <Card.Img src={m.profile_image}/> : ""}
                                            {m.name}</Card.Title>
                                        <Card.Text className={styles['mentors-contents']}>
                                            {m.introduce}<br/>
                                            <reactIconFa.FaRunning className={styles['icons']}/>
                                            {m.crops}<br/>
                                            <reactIconFa.FaMapMarked className={styles['icons']}/>
                                            {m.target_area}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        ))}
                    </InfiniteScroll>
                </CardColumns>
            </div>
        );
    }

    componentDidMount() {

        this.getMentees(1);
    }

    getMentees = async (page) => {

        const res = await API.getMentees(page);

        this.setState({
            mentees: this.state.mentees.concat(res.data),
            current_page: res.current_page,
            last_page: res.last_page,
        });
    }
}

export default Mentees;
