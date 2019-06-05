import {combineReducers} from 'redux';
import {auth} from './auth';
import {mainLists} from './main';
import {mentor} from './mentor';
import {diary} from './diary';
import {openapi} from './openapi';


export const reducers = combineReducers({
    auth: auth,
    mains: mainLists, // state.mains 값은 reducers/* 의 키값과 같아야 한다
    mentor: mentor,
    diary: diary,
    openapi: openapi,
});
