import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import appData from './reducers'

let store = createStore(appData);
let root = document.getElementById('root');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);
