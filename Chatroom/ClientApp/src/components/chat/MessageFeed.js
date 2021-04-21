import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SetupMessageReciever } from './SignalRConnection';

import './MessageFeed.css'

export class MessageFeed extends Component {
    static displayName = MessageFeed.name;
    state = {
        messages: []
    }

    constructor() {
        super();
        SetupMessageReciever((update) => {
            console.log("RecieveMessage inner", update);
            let messageList = this.state.messages;
            messageList.push(update);
            this.setState({
                messages: messageList
            });
            console.log(this.state.messages);
        });
    }

    render() {
        const messageList = this.state.messages.map((message, i) =>
            <li key={i}>
                <Container><Row>
                    <Col><div className="font-weight-bold">[{message.author}]:</div></Col>
                    <Col xs={8}>{message.message}</Col>
                </Row></Container>
            </li>
        );
        return (
            <div id="messageFeed">
                <ul className="list-unstyled">
                    <li id="entrypoint"></li>
                    {messageList}
                </ul>
            </div>
        );
    }
}