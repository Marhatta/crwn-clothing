import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './redux/store';

import './index.css';
import App from './App';


//Routes set up
const Root = () => {
    return(
        <Provider store={store}>
        <Router>
            <App />
        </Router>
        </Provider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));

