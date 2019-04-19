// import axios from 'axios';
// import * as types from './ActionTypes';
//
//
// const apiSubwayNumberLists = 'https://www.familybook-app.com:501/test/graphql';
// const apiSearchLists = 'https://www.familybook-app.com:501/test/search';
//
//
// export const subwayNumberLists = (line, page, firstLoad) => {
//
//     return (dispatch) => {
//
//         return axios.get(`${apiSubwayNumberLists}?line=${line}&page=${page}`)
//
//             .then(response => {
//
//                 if(typeof response.data.data !== 'undefined'){
//
//
//                     dispatch(subwayNumberListsSuccess(response.data.data.station, page, firstLoad ? types.SUBWAY_FIRST_LOAD : types.SUBWAY_ON_LOAD))
//                 }
//
//             })
//             .catch(error => {
//
//                 throw(error);
//
//                 // this.setState({
//                 //     error: err.message,
//                 //     isLoading: false,
//                 // });
//             });
//     };
// };
//
// export const searchLists = (query) => {
//
//     return (dispatch) => {
//
//         return axios.get(`${apiSearchLists}?query=${query}`)
//
//             .then(response => {
//
//                 dispatch(searchListsSuccess(response.data.data))
//             })
//             .catch(error => {
//
//                 throw(error);
//
//             });
//     }
// }
//
//
// export const searchListsSuccess = (datas) => {
//
//     return {
//
//         type: types.SUBWAY_SEARCH,
//         payload: {
//             datas: datas
//         }
//     }
// }
//
// export const subwayNumberListsSuccess = (datas, currentPage, type_load) => {
//    
//     return {
//
//         type: type_load,
//         payload: {
//             datas: datas,
//             isLoading: true,
//             currentPage: currentPage + 1
//         }
//     }
// }
//
