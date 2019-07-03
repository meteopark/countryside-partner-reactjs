import React, {Component} from 'react';
import MentorIntroduce from "./MentorIntroduce";
import {ControlledCarousel} from "./ControlledCarousel";
import {BestDiaries} from "./BestDiaries";
import {EducationFarmsMain} from "./EducationFarmsMain";
import {Sns} from "./Sns";



class Main extends Component {

    render() {

        return (

            <div>
                {/*<ControlledCarousel/>*/}
                <MentorIntroduce />
                <Sns/><br/>
                <EducationFarmsMain/>
                <BestDiaries/><br/>
            </div>
        );
    }


}

export default Main;
