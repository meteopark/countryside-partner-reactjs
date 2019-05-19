import * as types from '../actions/ActionTypes';

const initialState = {

    diary: []
};

export const diary = (state = initialState, action) => {

    switch (action.type) {

        case types.DIARY:

            return {

                diary: [action.payload.datas]
            };

        default:

            return state;
    }
}