import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/chat/Home';
import { Place } from './components/place/Place';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render () {
        return (
            <div>
                <Route exact path='/' component={Home} />
                <Route exact path='/place' component={Place} />
            </div>
        );
    }
}
