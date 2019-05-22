import axios from 'axios';
import * as types from './ActionTypes';


const apiMachine = 'http://countryside-partner-laravel.test/api/openapi/machines';


export const machineLists = (search) => {

    return (dispatch) => {

        let apiAdd = "?type=json&CTPRVN="+search.ctprvn;

        if(search.fch_knd !== "") apiAdd += "&FCH_KND="+search.fch_knd;

        return axios.get(`${apiMachine}${apiAdd}`)
            .then(response => {

                dispatch(Success(response.data, types.OPENAPI_MACHINE));
            })
            .catch(e => {
                throw(e);
            });
    }
}

export const Success = (success, type) => {

    return {
        type: type,
        payload: {
            datas: success.Grid_20141119000000000080_1.row
        }
    }
}
