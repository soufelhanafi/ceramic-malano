import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import "./assets/styles/antd.scss"
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import combinedReducers from "./redux/reducers"
import sagas from "./redux/sagas"
import Cookies from 'universal-cookie'
import axios from "axios"

const cookies = new Cookies()
if (cookies.get('x-auth-token')) {
  axios.defaults.headers.common['x-auth-token'] = cookies.get('x-auth-token')
}

const sagaMiddleware = createSagaMiddleware()
const middlewares = [ sagaMiddleware ]

if (process.env.NODE_ENV === 'development' && true) {
  middlewares.push(logger)
}

const store = createStore(combinedReducers, compose(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
