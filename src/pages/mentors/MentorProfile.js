import React from 'react';
import styles from './Mentors.module.scss';
import {Row, Col, Image, Container, Button} from 'react-bootstrap';
import * as reactIconFa from "react-icons/fa";

export const MentorProfile = (props) => {

    const mentor = props.mentor;

    const jumbotronStyle = {
        backgroundImage: 'url(/images/bg/profile-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div className={styles['blog-container-fluid']}>
            <div style={jumbotronStyle}>
                <div className={styles['blog-introduce']}>
                    <Container className={styles['profile-container']}>
                        <Row className="justify-content-md-center">
                            <Col sm={3} className={styles['profile-image-container']}>
                                <Image
                                    className={styles['profile-image']}
                                    roundedCircle
                                    src={mentor.profile_image ? mentor.profile_image : '/images/no-image.png'}
                                />
                                <br/>
                                <Button variant="success" className={styles['mentoring-button']}>
                                    <reactIconFa.FaPaperPlane className={styles['icon']}/>
                                    멘토링 요청
                                </Button>
                            </Col>
                            <Col className={styles['profile-info']}>
                                <h1>{mentor.farm_name ? mentor.farm_name : "NULL"}</h1>
                                <reactIconFa.FaUserAlt className={styles['icon']}/>
                                {mentor.name} ({mentor.id})
                                <br/>
                                <reactIconFa.FaHome className={styles['icon']}/>
                                {mentor.address}
                                <br/>
                                <reactIconFa.FaSeedling className={styles['icon']}/>
                                {mentor.crops}
                                <br/>
                                <reactIconFa.FaTractor className={styles['icon']}/>
                                {mentor.career}
                                <br/>
                                <reactIconFa.FaPiedPiperHat className={styles['icon']}/>
                                {mentor.homi}개
                                <br/>
                                <reactIconFa.FaUserFriends className={styles['icon']}/>
                                멘토링 {mentor.mentoring_count}회
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

