import React, {Component} from 'react';

import MentorIntroduce from "./MentorIntroduce";
import {ControlledCarousel} from "./ControlledCarousel";
import {BestDiaries} from "./BestDiaries";
import {EducationFarms} from "./EducationFarms";
import {WeekFarmInfo} from "./WeekFarmInfo";


class Main extends Component {

    render() {

        return (

            <div>
                {/*<ControlledCarousel/>*/}
                {/*<MentorIntroduce />*/}
                {/*<BestDiaries/>*/}
                {/*<br/>*/}
                <EducationFarms/>
                <br/>
            </div>
        );
    }


}

export default Main;
