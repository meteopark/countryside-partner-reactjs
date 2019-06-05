import axios from 'axios';
import * as types from './ActionTypes';


const apiMains          = 'http://countryside-partner-laravel.test/api/v1/main';
const apiMentors         = 'http://countryside-partner-laravel.test/api/v1/mentors';
const apiMentees         = 'http://countryside-partner-laravel.test/api/v1/mentees';
const apiMentorDiaries  = 'http://countryside-partner-laravel.test/api/v1/diaries-mentors'; // {mentor_srl}/articles
const apiDiary          = 'http://countryside-partner-laravel.test/api/v1/diaries-mentors/articles'; // {diary_srl}
const apiAuthCheck      = 'http://countryside-partner-laravel.test/api/v1/auth'; // {diary_srl}


export const authCheck = () => {

    return (dispatch) => {

        let config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        return axios.get(`${apiAuthCheck}`, config)
            .then(response => {

                dispatch(Success(response.data, types.AUTH_CHECK))
            })
            .catch(error => {
                console.log("error", error);
            });
    }

}

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

export const menteeLists = () => {

    return (dispatch) => {

        return axios.get(`${apiMentees}`)

            .then(response => {

                dispatch(Success(response.data, types.MENTEE_LISTS))
            })
            .catch(error => {

                console.log("error : menteeLists() " , error);
                throw(error);

            });
    }
}

export const mentorLists = () => {

    return (dispatch) => {

        return axios.get(`${apiMentors}`)

            .then(response => {

                dispatch(Success(response.data, types.MENTOR_LISTS))
            })
            .catch(error => {

                console.log("error : mentors() " , error);
                throw(error);

            });
    }
}

export const getMentor = (mentor) => {

    return (dispatch) => {

        const url = `${apiMentors}/${mentor}`;

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

                isLogged(false);

            });
    }
}

export const isLogged = (stat = false) => {

    if (stat === true) {

        return {

            type: types.IS_LOGGED,
            payload: {
                datas: true
            }
        }

    } else {

        return {

            type: types.IS_LOGGED,
            payload: {
                datas: false
            }
        }
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