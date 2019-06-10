import * as types from '../actions/ActionTypes';

const initialState = {

    lists: [],
};

export const openapi = (state = initialState, action) => {

    switch (action.type) {

        case types.OPENAPI_MACHINE:

            return {

                lists: action.payload.datas,
            };

        case types.OPENAPI_DICTIONARY:

            return {

                lists: action.payload.datas,
            };

        case types.OPENAPI_SPECIALCROPS:

            return {
                lists: action.payload.datas,
            }

        default:

            return state;
    }
}