import axios from 'axios';
import * as types from './ActionTypes';


const apiMains          = 'http://countryside-partner-laravel.test/api/v1/main';
const apiMentor         = 'http://countryside-partner-laravel.test/api/v1/mentors';
const apiMentorDiaries  = 'http://countryside-partner-laravel.test/api/v1/diaries-mentors'; // /{mentor_srl}/articles

export const mainLists = () => {

    return (dispatch) => {

        return axios.get(`${apiMains}`)

            .then(response => {

                dispatch(Success(response.data, types.MAIN_LISTS))
            })
            .catch(error => {

                console.log("error : mainLists() " , error);
                throw(error);

            });
    }
}

export const mentorLists = () => {

    return (dispatch) => {

        return axios.get(`${apiMentor}`)

            .then(response => {

                dispatch(Success(response.data, types.MENTORS))
            })
            .catch(error => {

                console.log("error : mentors() " , error);
                throw(error);

            });
    }
}

export const getMentor = (mentor) => {

    return (dispatch) => {

        return axios.get(`${apiMentor}/${mentor}`)

            .then(response => {

                dispatch(Success(response.data, types.MENTOR))

            })
            .catch(error => {

                console.log("error : mentors() " , error);
                throw(error);

            });
    }
}
export const getMentorDiaries = (mentor, page) => {

    return (dispatch) => {

        return axios.get(`${apiMentorDiaries}/${mentor}/articles?page=${page}`)

            .then(response => {

                dispatch(Success(response.data, types.MENTOR_DIARIES));
            })
            .catch(error => {

                console.log("error : getMentorDiaries() " , error);
                throw(error);

            });
    }
}


export const Success = (datas, type) => {

    return {

        type: type,
        payload: {
            datas: datas.response
        }
    }
}

// 로그인 상태 관리
export const isLogged = () => {

    let is_logged = false;

    if(localStorage.getItem('token')) is_logged = true;

    return {
        type: types.IS_LOGGED,
        is_logged: is_logged
    }

};