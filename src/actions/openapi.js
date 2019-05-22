import axios from 'axios';
import * as types from './ActionTypes';


const apiMachine = 'http://countryside-partner-laravel.test/api/openapi/machines';


export const machineLists = (search) => {

    return (dispatch) => {

        // return $this->callApi(self::API_GRID_MACHINES, $request->type, $request->param);




        let apiAdd = "";
        if(search.ctprvn !== ""){

            apiAdd += "?type=json";
            apiAdd += "&param=";
            // apiAdd += "&CTPRVN="+encodeURI(search.ctprvn)+"&FCH_KND="+encodeURI(search.fch_knd);
        }

        console.log("vvv", `${apiMachine}${apiAdd}`);
        return axios.get(`${apiMachine}${apiAdd}`)
            .then(response => {
                dispatch(Success(response.data, types.OPENAPI_MACHINE));

console.log("---'", response.data);
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
