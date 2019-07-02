import * as types from '../actions/ActionTypes';

const initialState = {
    is_logged: false,
};

export const auth = (state = initialState, action) => {

    switch(action.type) {

        case types.AUTH_CHECK:

            if (action.payload.datas.stat === 0) {

                return {
                    is_logged: true,
                    srl: action.payload.datas.response.srl,
                    user_type: action.payload.datas.response.user_type,
                };
            }

            localStorage.clear();
            return {is_logged: false};

        case types.IS_LOGGED:

            if (action.payload.datas.logged === true) {

                return {
                    is_logged: true,
                    srl: action.payload.datas.srl,
                    user_type: action.payload.datas.user_type,
                };
            }
            localStorage.clear();
            return {is_logged: false};

        default:

            return state;
    }
}