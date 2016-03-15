import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import App from './containers/App'
import Settings from './components/Settings'
import appData from './reducers'

let store = createStore(combineReducers({
    appData,
    routing: routerReducer
}));

let root = document.getElementById('root');

const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
            <Route path="settings" component={Settings} />
        </Router>
    </Provider>,
    root
);
