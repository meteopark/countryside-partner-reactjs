import {combineReducers} from 'redux';
import {mainLists} from './main';

export const reducers = combineReducers({
    mains: mainLists // state.mains 값은 reducers/villagege.js 의 키값과 같아야 한다
});
