import React from 'react';
import {Carousel} from 'react-bootstrap';
import styles from './Main.module.scss';
import classNames from 'classnames';

export function ControlledCarousel() {

    return (
        <div className={classNames('container', styles['full-width'])}>
            <Carousel>
                <Carousel.Item>
                    <a href="http://www.mafra.go.kr/mafra/1246/subview.do" target="_blank" rel="noopener noreferrer">
                        <img
                            className={classNames("d-block", "w-100", styles['cc-banner'])}
                            src="/images/banner/banner1.jpg"
                            alt="slide1"
                        />
                        <Carousel.Caption>
                            {/*<h3>First slide label</h3>*/}
                            {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                        </Carousel.Caption>
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href="http://www.mafra.go.kr/FMD-AI/1510/subview.do" target="_blank" rel="noopener noreferrer">
                        <img
                            className={classNames("d-block", "w-100", styles['cc-banner'])}
                            src="/images/banner/banner2.jpg"
                            alt="slide2"
                        />
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href="http://www.mafra.go.kr/mafra/2115/subview.do" target="_blank" rel="noopener noreferrer">
                        <img
                            className={classNames("d-block", "w-100", styles['cc-banner'])}
                            src="/images/banner/banner3.jpg"
                            alt="slide3"
                        />
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href="https://www.together100.go.kr" target="_blank" rel="noopener noreferrer">
                        <img
                            className={classNames("d-block", "w-100", styles['cc-banner'])}
                            src="/images/banner/banner4.jpg"
                            alt="slide4"
                        />
                    </a>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
