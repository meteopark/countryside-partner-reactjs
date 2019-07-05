import React from 'react';
import MentorIntroduce from "./MentorIntroduce";
import {ControlledCarousel} from "./ControlledCarousel";
import {BestDiaries} from "./BestDiaries";
import {EducationFarmsMain} from "./EducationFarmsMain";
import {Sns} from "./Sns";

export function Main(){

    return (

        <div>
            <ControlledCarousel/>
            <MentorIntroduce />
            <Sns/><br/>
            <EducationFarmsMain/>
            <BestDiaries/><br/>
        </div>
    );
}