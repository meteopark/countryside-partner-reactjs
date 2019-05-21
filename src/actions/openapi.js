import axios from 'axios';
import * as types from './ActionTypes';


const apiMachine = 'http://211.237.50.150:7080/openapi/b4f371498f96c269899f61303f99cd9a4e1a9bcc6693ffb906eb4d12fc141174/json/Grid_20141119000000000080_1/1/10?YEAR=2014';
const apiMains          = 'http://countryside-partner-laravel.test/api/v1/mentors';


export const machineLists = () => {

    return (dispatch) => {

        return axios.get(`${apiMains}`)
            .then(response => {

                // dispatch(Success(response.data, types.OPENAPI_MACHINE));


                let sample= {
                    'Grid_20141119000000000080_1' : {
                        'row':
                            [
                                {'ROW_NUM': 1,
                            'YEAR': "2014",
                            'CTPRVN': new Date().getMilliseconds()+"경기도",
                            'FCH_KND': "농용트랙터",
                            'FCH_KND_DETAIL': "소형",
                            'HOLD_STTUS': 410,},
                                {'ROW_NUM': 2,
                                    'YEAR': "2014",
                                    'CTPRVN': (new Date().getMilliseconds()+3)+"세종특별자치시",
                                    'FCH_KND': "농용트랙터",
                                    'FCH_KND_DETAIL': "소형",
                                    'HOLD_STTUS': 410,},
                                {'ROW_NUM': 3,
                                    'YEAR': "2014",
                                    'CTPRVN': new Date().getMilliseconds()*2+"서울시",
                                    'FCH_KND': "농용트랙터",
                                    'FCH_KND_DETAIL': "소형",
                                    'HOLD_STTUS': 410,}
                                ]

                    }
                }
                dispatch(Success(sample, types.OPENAPI_MACHINE));




            })
            .catch(error => {
                console.log("error : machineLists() " , error);
                throw(error);
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
