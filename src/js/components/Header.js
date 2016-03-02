import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return(
            <header>
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <span className="navbar-brand">Eve (α)</span>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><a href="#/">Проекты</a></li>
                            <li><a href="#/settings">Настройки</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}
