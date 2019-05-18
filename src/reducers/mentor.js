import * as types from '../actions/ActionTypes';

const initialState = {

    mentor: {},
    diaries: {
        current_page: 0,
        data: []
    },
};

export const mentor = (state = initialState, action) => {

    switch (action.type) {

        case types.MENTOR:

            return {

                mentor: action.payload.datas,
                diaries:{
                    current_page: 1,
                    data: []
                },

            };

        case types.MENTOR_DIARIES:

            return {

                diaries: {
                    current_page: action.payload.datas.current_page,
                    data: [...action.payload.datas.data],
                }
            };

        default:

            return state;
    }
}