import React, {Component} from 'react';

import MentorIntroduce from "./MentorIntroduce";
import {ControlledCarousel} from "./ControlledCarousel";
import {BestDiaries} from "./BestDiaries";
import {EducationFarmsMain} from "./EducationFarmsMain";


class Main extends Component {

    render() {

        return (

            <div>
                {/*<ControlledCarousel/>*/}
                <MentorIntroduce />
                <BestDiaries/>
                <br/>
                <EducationFarmsMain/>
                <br/>
            </div>
        );
    }


}

export default Main;
