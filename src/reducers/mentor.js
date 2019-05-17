import * as types from '../actions/ActionTypes';

const initialState = {

    mentor: {},
    diaries: {
        current_page: 1,
        data: [],
        hasMoreItems: true
    },


};

export const mentor = (state = initialState, action) => {

    switch (action.type) {

        case types.MENTOR:

            return {

                mentor: action.payload.datas,
                diaries:{
                    current_page: 1,
                    data: [],
                    hasMoreItems: true
                },

            };

        case types.MENTOR_DIARIES:

            return {

                diaries: {
                    current_page: action.payload.datas.current_page,
                    data: [...action.payload.datas.data],
                    // hasMoreItems: action.payload.datas.data.length > 0 ? true : false
                    hasMoreItems: false
                }
            };

        default:

            return state;
    }
}