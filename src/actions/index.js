import axios from 'axios';
import * as types from './ActionTypes';


const apiMains          = 'http://countryside-partner-laravel.test/api/v1/main';
const apiMentor         = 'http://countryside-partner-laravel.test/api/v1/mentors';
const apiMentorDiaries  = 'http://countryside-partner-laravel.test/api/v1/diaries-mentors'; // {mentor_srl}/articles
const apiDiary          = 'http://countryside-partner-laravel.test/api/v1/diaries-mentors/articles'; // {diary_srl}


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

        const url = `${apiMentor}/${mentor}`;

        return axios.get(url)

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

export const getDiary = (diary_id) => {

    return (dispatch) => {

        let config = {headers: {}};

        if ( localStorage.getItem('token') )
        {
            config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            };
        }

        return axios.get(`${apiDiary}/${diary_id}`, config)

            .then(response => {

                if (!response.data.error) {
                    dispatch(Success(response.data, types.DIARY));
                }
            })
            .catch(error => {

                console.log("error : getDiary() " , error);
                throw(error);

            });
    }
}


export const Success = (datas, type) => {

    return {

        type: type,
        payload: {
            datas: datas
        }
    }
}

// 로그인 상태 관리
export const isLogged = (stat) => {

    let is_logged = false;

    if (stat) {

        is_logged = true;
    }

    return {
        type: types.IS_LOGGED,
        is_logged: is_logged
    }

};