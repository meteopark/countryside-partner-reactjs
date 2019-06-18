import React, {useState, useEffect} from 'react';
import styles from './Mentors.module.scss';
import {Row, Col, Image, Container, Button} from 'react-bootstrap';
import * as reactIconFa from "react-icons/fa";
import history from "../history";

export const MentorProfile = (props) => {

    const mentor = props.mentor;
    const [userInfo, setUserInfo] = useState('');

    const jumbotronStyle = {
        backgroundImage: 'url(/images/bg/profile-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    const handleToMentoring = () => {

        history.push({
            pathname: '/chat/mentoring',
            state: {
                userInfo: userInfo,
            }
        });
    }
    useEffect(() => {
        setUserInfo(`mentor_${mentor.mentor_srl}`)
    }, [mentor.mentor_srl]);

    return (

        <div className={styles['profile-container-fluid']}>
            <div style={jumbotronStyle}>
                <div className={styles['profile-introduce']}>
                    <Container className={styles['profile-container']}>
                        <Row className="justify-content-md-center">
                            <Col sm={3} className={styles['profile-image-container']}>
                                <Image
                                    className={styles['profile-image']}
                                    roundedCircle
                                    src={mentor.profile_image ? mentor.profile_image : '/images/no-image.png'}
                                />
                                <br/>
                                <Button variant="success" className={styles['mentoring-button']} onClick={handleToMentoring}>
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

