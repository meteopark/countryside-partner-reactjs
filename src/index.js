import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./store";
import {Root} from "./pages/Root";

import classNames from 'classnames';

// import 'bootstrap/dist/css/bootstrap.css';
import './gg-font.css';
import './bootstrap.css';
import './index.css';

ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
