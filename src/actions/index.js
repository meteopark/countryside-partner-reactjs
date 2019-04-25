import axios from 'axios';
import * as types from './ActionTypes';


const apiMains = 'http://countryside-partner-laravel.test/api/main';

export const mainLists = () => {

    return (dispatch) => {

        return axios.get(`${apiMains}`)

            .then(response => {

                dispatch(mainListsSuccess(response.data))
            })
            .catch(error => {

                console.log("error : mainLists() " , error);
                throw(error);

            });
    }
}

export const mainListsSuccess = (datas) => {

    return {

        type: types.MAIN_LISTS,
        payload: {
            datas: datas
        }
    }
}
