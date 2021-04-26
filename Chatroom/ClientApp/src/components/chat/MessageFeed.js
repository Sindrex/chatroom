import React, { Component } from 'react';
import { SetupMessageReciever, SetupConnectedReciever, SetupMessageHistoryReciever, SendChatMessageHistory } from '../signalr/ChatConnection';

import './MessageFeed.css'

export class MessageFeed extends Component {
    static displayName = MessageFeed.name;
    state = {
        messages: []
    }

    constructor() {
        super();
        SetupMessageReciever((update) => {
            let messageList = this.state.messages;
            messageList.push(update);
            this.setState({
                messages: messageList
            });
            console.log("Messages", this.state.messages);
        });
        SetupConnectedReciever((update) => {
            let messageList = this.state.messages;

            messageList.push({
                author: update.author,
                message: "has arrived!"
            });
            this.setState({
                messages: messageList
            });
            console.log("Messages", this.state.messages);

            SendChatMessageHistory(messageList, update.connectionId)
        });
        SetupMessageHistoryReciever((update) => {
            let messageList = this.state.messages;
            messageList = update;
            this.setState({
                messages: messageList
            });
            console.log("Messages", this.state.messages);
        });
    }

    render() {
        const messageList = this.state.messages.map((message, i) =>
            <li key={i}>
                <p className="font-weight-bold">[{message.author}]:</p>
                <p>{message.message}</p>
            </li>
        );
        return (
            <div id="messageFeed">
                <ul className="list-unstyled">
                    {messageList}
                </ul>
            </div>
        );
    }
}