
import React from 'react';
import {Carousel} from 'react-bootstrap';

export class ControlledCarousel extends React.Component {


    render() {

        return (

            <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="http://www.welchon.com/upload/2013/04/09/79869590845248258632_thumbnail1.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
            </Carousel>
        );
    }
}
