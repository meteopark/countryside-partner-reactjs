import {combineReducers} from 'redux';
import {variableState} from './variableState';
import {mainLists} from './main';
import {mentor} from './mentor';


export const reducers = combineReducers({
    variable_state: variableState, // globals 변수
    mains: mainLists, // state.mains 값은 reducers/* 의 키값과 같아야 한다
    mentor: mentor
});
