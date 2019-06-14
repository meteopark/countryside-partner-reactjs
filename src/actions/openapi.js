import axios from 'axios';
import * as types from './ActionTypes';


const apiMachine = 'http://countryside-partner-laravel.test/api/openapi/machines';
const apiDicitionary = 'http://countryside-partner-laravel.test/api/openapi/dictionary';
const apiSpecialCrops = 'http://countryside-partner-laravel.test/api/openapi/special-crops';
const apiEmptyHouses = 'http://countryside-partner-laravel.test/api/openapi/empty-houses';

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

export const specialCropsLists = (year, ctprvn) => {

    return (dispatch) => {

        let apiAdd = `?year=${year}&ctprvn=${ctprvn}`;

        return axios.get(`${apiSpecialCrops}${apiAdd}`)
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

        return axios.get(`${apiEmptyHouses}${apiAdd}`)
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
