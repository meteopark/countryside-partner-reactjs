import {reducers} from "../reducers";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';

export const store = createStore(reducers, compose(applyMiddleware(thunk)));