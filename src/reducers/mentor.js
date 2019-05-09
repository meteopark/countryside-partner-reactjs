import * as types from '../actions/ActionTypes';

const initialState = {
    data: []
};

export const mentor = (state = initialState, action) => {



    switch(action.type) {

        case types.MENTOR:

            return {
                data: [
                    action.payload.datas
                ]
            };

        default:

            return state;
    }
}