import * as types from '../actions/ActionTypes';

const initialState = {
    is_logged: false,
};

export const auth = (state = initialState, action) => {

    switch(action.type) {

        case types.AUTH_CHECK:

            if (action.payload.datas.stat === 0) {

                return {is_logged: true};
            }

            localStorage.clear();
            return {is_logged: false};

        case types.IS_LOGGED:

            if (action.payload.datas === true) {

                return {is_logged: true};
            }
            localStorage.clear();
            return {is_logged: false};

        default:

            return state;
    }
}