import axios from 'axios';
import * as types from './ActionTypes';


const apiMains      = 'http://countryside-partner-laravel.test/api/v1/main';
const apiMentor     = 'http://countryside-partner-laravel.test/api/v1/mentors';

export const mainLists = () => {

    return (dispatch) => {

        return axios.get(`${apiMains}`)

            .then(response => {

                dispatch(mainListsSuccess(response.data, types.MAIN_LISTS))
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

                dispatch(mainListsSuccess(response.data, types.MENTORS))
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

                dispatch(mainListsSuccess(response.data, types.MENTOR))

            })
            .catch(error => {

                console.log("error : mentors() " , error);
                throw(error);

            });
    }
}

export const mainListsSuccess = (datas, type) => {

    return {

        type: type,
        payload: {
            datas: datas.response
        }
    }
}

