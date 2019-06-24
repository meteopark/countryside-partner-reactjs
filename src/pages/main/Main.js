import React, {Component} from 'react';

import MentorIntroduce from "./MentorIntroduce";
import {ControlledCarousel} from "./ControlledCarousel";
import {BestDiaries} from "./BestDiaries";


class Main extends Component {

    render() {

        return (

            <div>
                {/*<ControlledCarousel/>*/}
                {/*<br/>*/}
                <MentorIntroduce />
                <BestDiaries/>
                <br/>
            </div>
        );
    }


}

export default Main;
