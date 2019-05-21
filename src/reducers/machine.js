import * as types from '../actions/ActionTypes';

const initialState = {

    lists: [],
};

export const machine = (state = initialState, action) => {

    switch (action.type) {

        case types.OPENAPI_MACHINE:

            return {

                lists: action.payload.datas,
            };

        default:

            return state;
    }
}