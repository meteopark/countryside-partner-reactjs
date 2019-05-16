import * as types from '../actions/ActionTypes';

const initialState = {
    data: {
        mentor: {},
        diaries: []
    }
};

export const mentor = (state = initialState, action) => {



    switch(action.type) {

        case types.MENTOR:

            return {
                data: {
                    mentor: action.payload.datas,
                    diaries: [...action.payload.datas.diaries],
                }
            };

        default:

            return state;
    }
}