import * as types from '../actions/ActionTypes';

const initialState = {
    is_logged: false,
};

export const variableState = (state = initialState, action) => {

    switch(action.type) {

        case types.IS_LOGGED:

            return {
                is_logged: action.is_logged
            };

        default:

            return state;
    }
}