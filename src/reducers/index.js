import {combineReducers} from 'redux';
import {auth} from './auth';
import {mainLists} from './main';
import {mentor} from './mentor';
import {diary} from './diary';
import {openapi} from './openapi';
import {mentee} from "./mentee";
import {user} from "./user";


export const reducers = combineReducers({
    auth: auth,
    user: user,
    mains: mainLists, // state.mains 값은 reducers/* 의 키값과 같아야 한다
    mentor: mentor,
    mentee: mentee,
    diary: diary,
    openapi: openapi,
});
