import axios from 'axios';
import * as types from './ActionTypes';


const apiMachine = 'http://countryside-partner-laravel.test/api/openapi/machines';
const apiDicitionary = 'http://countryside-partner-laravel.test/api/openapi/dictionary';


export const machineLists = (search) => {

    return (dispatch) => {

        let apiAdd = "?CTPRVN="+search.ctprvn;

        if(search.fch_knd !== "") apiAdd += "&FCH_KND="+search.fch_knd;

        return axios.get(`${apiMachine}${apiAdd}`)
            .then(response => {
                dispatch(Success(response.data.Grid_20141119000000000080_1.row, types.OPENAPI_MACHINE));
            })
            .catch(e => {
                throw(e);
            });
    }
}

export const dictionaryLists = (cl_nm) => {

    return (dispatch) => {

        let apiAdd = "?CL_NM="+cl_nm;

        return axios.get(`${apiDicitionary}${apiAdd}`)
            .then(response => {
                dispatch(Success(response.data.Grid_20151230000000000339_1.row, types.OPENAPI_DICTIONARY));
            })
            .catch(e => {
                throw(e);
            });
    }
}

export const Success = (response, type) => {

    return {
        type: type,
        payload: {
            datas: response
        }
    }
}
