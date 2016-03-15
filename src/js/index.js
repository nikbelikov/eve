import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import ProjectList from './containers/ProjectList'
import ProjectRoot from './containers/ProjectRoot'
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
            <Route path="/" component={ProjectList} />
            <Route path="project/:projectId" component={ProjectRoot} />
            <Route path="settings" component={Settings} />
        </Router>
    </Provider>,
    root
);
