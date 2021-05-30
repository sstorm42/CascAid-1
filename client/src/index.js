import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Routes from './route';
import reducers from './reducers';
import { NotificationContainer } from 'react-notifications';
import * as APIPaths from './constants/api-paths';
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <NotificationContainer />
            <audio className="audio-element-notification">
                <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
            </audio>
            <audio className="audio-element-message">
                <source src={APIPaths.serverAddress + '/static-files/message-tone.mp3'}></source>
            </audio>
            <Routes />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
