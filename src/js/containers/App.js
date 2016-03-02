import React, { Component } from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Project from '../containers/Project'
import Settings from '../components/Settings'
import Header from '../components/Header'

export default class App extends Component {
    render() {
        return(
            <div>
                <Header />

                <Router history={hashHistory}>
                    <Route path="/" component={Project} />
                    <Route path="settings" component={Settings}/>
                </Router>

                <p className="text-center">2016 &copy; Eve (α)</p>
            </div>
        );
    }
}
