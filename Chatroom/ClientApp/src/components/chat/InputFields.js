import React, { Component } from 'react';
import { SendMessage } from './SignalRConnection';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

import './InputFields.css'

export class InputFields extends Component {
    static displayName = InputFields.name;

    constructor() {
        super();
    }

    render () {
        return (
            <div id="foot">
                <form onSubmit={this.OnSendMessage}>
                    <Container>
                        <Row className="align-items-center">
                            <Col xs={4}>
                                <input type="text" id="author" className="form-control" placeholder="Your name here..." required/>
                            </Col>
                            <Col xs={6}>
                                <input type="text" id="message" className="form-control" placeholder="Write a message and press Enter..." required/>
                            </Col>
                            <Col>
                                <Button id="submit" type="submit" className="btn btn-primary">
                                    Send
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </form>
            </div>
        );
    }

    OnSendMessage(e) {
        e.preventDefault();
        const author = document.getElementById("author").value;
        const messageInput = document.getElementById("message");
        const message = messageInput.value;
        SendMessage(e, author, message);

        document.getElementById("message").value = "";
    }
}
