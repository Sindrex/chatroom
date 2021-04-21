import React, { Component } from 'react';
import { MessageFeed } from './MessageFeed';
import { InputFields } from './InputFields';
import { SetupConnection } from './SignalRConnection';

import './Home.css'
import image from './Chatroom.png';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        SetupConnection();
    }

    render () {
        return (
            <div id="container">
                <header id="header">
                    <img src={image} alt="..." width="600" height="150" />
                    <div>A chat solution by Sindrex</div>
                    <div>April 2021</div>
                </header>
                <MessageFeed/>
                <InputFields />
            </div>
        );
    }
}
