import React, { Component } from 'react';
import { MessageFeed } from './MessageFeed';
import { InputFields } from './InputFields';
import { OnlineTracker } from './OnlineTracker';
import { SetupChatConnection } from '../signalr/ChatConnection';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image from './Chatroom.png';

import './Home.css'

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        SetupChatConnection();
    }

    render () {
        return (
            <Container fluid>
                <Row>
                    <Col xs={2} id="leftsidebar">
                        <a href="/place">THE PLACE</a>
                        <OnlineTracker/>
                    </Col>
                    <Col>
                        <div id="container">
                            <header id="header">
                                <img src={image} alt="..." width="600" height="150" />
                                <div>A chat solution by Sindrex</div>
                                <div>April 2021</div>
                            </header>
                            <MessageFeed/>
                            <InputFields/>
                        </div>
                    </Col>
                    <Col xs={2}>
                    </Col>
                </Row>
            </Container>
        );
    }
}
