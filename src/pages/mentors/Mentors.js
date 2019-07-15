import React, {Component} from 'react';
import styles from './Mentors.module.scss';
import {Link} from 'react-router-dom';
import API from "../api/api";
import {CardColumns, Card, Spinner} from 'react-bootstrap';
import classNames from "classnames";
import * as reactIconFa from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

class Mentors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
            mentors: [],
            current_page: 1,
            last_page: 1,
        }
    }

    loadItems = () => {

        if (this.state.last_page <= this.state.current_page) this.setState({hasMore: false});
        this.getMentors(this.state.current_page + 1);
    }

    render() {
        return (
            <div className={classNames('container', styles['in-container'])}>

                <p className={styles['header-container']}>
                    <reactIconFa.FaRegLaugh className={styles['main-icon']}/>
                    멘토소개
                </p>
                <CardColumns bsPrefix={'card-columns-custom'}>

                    <InfiniteScroll
                        dataLength={this.state.mentors.length}
                        next={this.loadItems}
                        hasMore={this.state.mentors.length < 1 ? false : this.state.hasMore}
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
                        {this.state.mentors.map((mentor, i) => (

                            <Link className={classNames(styles['link'])} to={`/mentors/${mentor.mentor_srl}`} key={i}>
                                <Card className={styles['mentors-cards']}>
                                    <Card.Body>
                                        <Card.Title className={styles['mentors-title']}>{mentor.profile_image ?
                                            <Card.Img src={mentor.profile_image}/> : ""}{mentor.farm_name}</Card.Title>
                                        <Card.Text className={styles['mentors-contents']}>
                                            <reactIconFa.FaUserAlt className={styles['icons']}/>
                                            {mentor.name}<br/>
                                            {/*<reactIconFa.FaHome className={styles['icons']} />{mentor.address}<br/>*/}
                                            <reactIconFa.FaSeedling className={styles['icons']}/>
                                            {mentor.crops}<br/>
                                            <reactIconFa.FaTractor className={styles['icons']}/>
                                            {mentor.career}
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

        this.getMentors(1);
    }

    getMentors = async (page) => {

        const res = await API.getMentors(page);

        this.setState({
            mentors: this.state.mentors.concat(res.data),
            current_page: res.current_page,
            last_page: res.last_page,
        });
    }

}

export default Mentors;
