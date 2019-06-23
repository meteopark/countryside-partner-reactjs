import axios from 'axios';
import * as types from './ActionTypes';
import {GlobalsContext} from "../pages/globals";

const API_HOST = GlobalsContext._currentValue.server_host;

const API_MACHINE = '/api/openapi/machines';
const API_DICITIONARY = '/api/openapi/dictionary';
const API_SPECIALCROPS = '/api/openapi/special-crops';
const API_EMPTYHOUSES = '/api/openapi/empty-houses';

export const machineLists = (search) => {

    return (dispatch) => {

        let apiAdd = "?CTPRVN="+search.ctprvn;

        if(search.fch_knd !== "") apiAdd += "&FCH_KND="+search.fch_knd;

        return axios.get(`${API_HOST}${API_MACHINE}${apiAdd}`)
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

        return axios.get(`${API_HOST}${API_DICITIONARY}${apiAdd}`)
            .then(response => {
                dispatch(Success(response.data.Grid_20151230000000000339_1.row, types.OPENAPI_DICTIONARY));
            })
            .catch(e => {
                throw(e);
            });
    }
}

export const specialCropsLists = (year, ctprvn) => {

    return (dispatch) => {

        let apiAdd = `?year=${year}&ctprvn=${ctprvn}`;

        return axios.get(`${API_HOST}${API_SPECIALCROPS}${apiAdd}`)
            .then(response => {

                if ( response.data.Grid_20141119000000000065_1 ) {
                    dispatch(Success(response.data.Grid_20141119000000000065_1.row, types.OPENAPI_SPECIALCROPS));
                }

            })
            .catch(e => {
                throw(e);
            });
    }
}

export const emptyHousesLists = (sidonm, gubuncd, dealtypecd) => {

    return (dispatch) => {

        let apiAdd = `?sidonm=${sidonm}&gubuncd=${gubuncd}&dealtypecd=${dealtypecd}`;

        return axios.get(`${API_HOST}${API_EMPTYHOUSES}${apiAdd}`)
            .then(response => {
                if ( response.data.Grid_20150914000000000230_1 ) {
                    dispatch(Success(response.data.Grid_20150914000000000230_1.row, types.OPENAPI_EMPTYHOUSES));
                }

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
