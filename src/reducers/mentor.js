import * as types from '../actions/ActionTypes';

const initialState = {

    mentor: {},
    diaries: {
        current_page: 0,
        last_page: 0,
        data: []
    },
    lists: {
        current_page: 0,
        last_page: 0,
        data: []
    },
};

export const mentor = (state = initialState, action) => {

    switch (action.type) {

        case types.GET_MENTOR:

            return {
                ...state,
                mentor: action.payload.datas,
            };

        case types.MENTOR_LISTS:

            return {

                ...state,
                lists: {
                    ...state.lists,
                    current_page: action.payload.datas.current_page,
                    data: [
                        ...state.lists.data,
                        ...action.payload.datas.data
                    ],
                    last_page: action.payload.datas.last_page,
                }
            };

        case types.MENTOR_DIARIES:

            return {
                ...state,
                diaries: {
                    ...state.diaries,
                    current_page: action.payload.datas.current_page,
                    data: [
                        ...state.diaries.data,
                        ...action.payload.datas.data
                    ],
                    last_page: action.payload.datas.last_page,
                },
            };

        default:

            return state;
    }
}