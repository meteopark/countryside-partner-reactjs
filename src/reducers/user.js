import * as types from '../actions/ActionTypes';

const initialState = {

    user: {}
};

export const user = (state = initialState, action) => {

    switch (action.type) {

        case types.GET_USER:

            return {

                user: action.payload.datas,

            };

        default:

            return state;
    }
}