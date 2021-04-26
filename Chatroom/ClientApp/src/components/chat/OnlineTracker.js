import React, { Component } from 'react';
import { SetupConnectedReciever, SetupSyncReciever, SetupDisconnectedReciever } from '../signalr/ChatConnection';

import './OnlineTracker.css'

export class OnlineTracker extends Component {
    static displayName = OnlineTracker.name;
    state = {
        online: []
    }

    constructor() {
        super();
        SetupConnectedReciever((update) => {
            let onlineList = this.state.online;
            onlineList.push(update);
            this.setState({
                online: onlineList
            });
            console.log("Online", this.state.online);
        });
        SetupSyncReciever((update) => {
            let onlineList = this.state.online;
            if (onlineList.some(e => e.connectionId === update.connectionId)) {
                console.log(update, "already in online list");
                return;
            }
            onlineList.push(update);
            this.setState({
                online: onlineList
            });
            console.log("Online", this.state.online);
        });
        SetupDisconnectedReciever((connectionId) => {
            let onlineList = this.state.online;
            var filteredList = onlineList.filter(e => e.connectionId !== connectionId);
            this.setState({
                online: filteredList
            });
            console.log("Online", this.state.online);
        });
    }

    render() {
        const onlineList = this.state.online.map((online, i) =>
            <li key={i}>
                <div className="font-weight-bold" id="left-align-text">[{online.author}]</div>
            </li>
        );
        return (
            <div id="onlineTracker">
                <p>Online:</p>
                <ul className="list-unstyled">
                    {onlineList}
                </ul>
            </div>
        );
    }
}