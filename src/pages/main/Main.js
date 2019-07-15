import React, {useEffect} from 'react';
import MentorIntroduce from "./MentorIntroduce";
import {ControlledCarousel} from "./ControlledCarousel";
import {BestDiaries} from "./BestDiaries";
import {EducationFarmsMain} from "./EducationFarmsMain";
import {Sns} from "./Sns";
import {useAlert} from "react-alert";
import {isIE} from 'react-device-detect';


export function Main(){

    const alert = useAlert()

    useEffect(() => {

        if(isIE){

            browserCheck();
        }

    }, []);

    const browserCheck = () => {
        alert.error('원활한 이용을 위해 크롬 브라우저를 이용해 주시기 바랍니다.', {
            timeout: 4000,
            // position: 'middle',
        });
    }

    return (

        <div>
            <ControlledCarousel/>
            <MentorIntroduce />
            <Sns/>
            <EducationFarmsMain/>
            <BestDiaries/><br/>
        </div>
    );
}
