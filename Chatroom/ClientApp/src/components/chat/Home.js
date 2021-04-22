import React, { Component } from 'react';
import { MessageFeed } from './MessageFeed';
import { InputFields } from './InputFields';
import { OnlineTracker } from './OnlineTracker';
import { SetupConnection } from './SignalRConnection';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image from './Chatroom.png';

import './Home.css'

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        SetupConnection();
    }

    render () {
        return (
            <Container fluid>
                <Row>
                    <Col md="auto">
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
                    <Col md="auto">
                        
                    </Col>
                </Row>
            </Container>
        );
    }
}
