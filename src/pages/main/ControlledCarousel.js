import React, {Component} from 'react';
import {Carousel} from 'react-bootstrap';
import styles from './Main.module.scss';
import classNames from 'classnames';

export class ControlledCarousel extends Component {


    render() {

        return (
            <div className={classNames('container', styles['full-container'], styles['f-width'])}>
                <Carousel>
                    <Carousel.Item>
                        <img
                            height="300px"
                            className="d-block w-100"
                            src="http://www.welchon.com/upload/2013/05/18/79869481845947687247_thumbnail1.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            height="300px"
                            className="d-block w-100"
                            src="http://www.welchon.com/upload/2013/04/09/79869590845248258632_thumbnail1.jpg"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}
