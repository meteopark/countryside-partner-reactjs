import "babel-polyfill";
import "isomorphic-fetch";
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./store";
import Root from "./pages/Root";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import './gg-font.css';
import './bootstrap.css';
import './index.css';
import history from "./pages/history";
import ReactGA from "react-ga";

const options = {
    position: positions.TOP_CENTER,
    timeout: 2000,
    offset: '30px',
    transition: transitions.SCALE
}

ReactGA.initialize('UA-143867520-1');
history.listen((location, action) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
});

ReactDOM.render(
    <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
            <Root />
        </AlertProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();


