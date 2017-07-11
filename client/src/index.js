"use strict"
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/index';
import App from './components/app';
import '../style/style.css';

import Home from './components/pages/home';
import Header from './components/header';
import Footer from './components/footer';
import RequireAuth from './components/auth/require_auth';
import RequireUnAuth from './components/auth/require_unauth';

import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';

import Posts from './components/pages/posts';

import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if(token) {
  store.dispatch({ type: AUTH_USER });
}

const Routes = (
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(Routes, document.querySelector('.container'));
