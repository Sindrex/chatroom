import React, { Component } from 'react';
import { SendMessage, SetupConnectedReciever, SyncAuthor, OnEnterChat } from './SignalRConnection';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

import './InputFields.css'

export class InputFields extends Component {
    static displayName = InputFields.name;
    state = {
        author: "Anonymous",
        named: false,
        authorVal: "",
        messageVal: ""
    }

    constructor() {
        super();
        SetupConnectedReciever((update) => {
            if (this.state.named) SyncAuthor(this.state.author);
        });
    }

    render() {
        if (this.state.named) {
            return (
                <div id="foot">
                    <form onSubmit={this.OnSendMessage} autocomplete="off">
                        <Container fluid>
                            <Row className="align-items-center">
                                <Col md="auto">
                                    <div className="font-weight-bold">[{this.state.author}]:</div>
                                </Col>
                                <Col>
                                    <input type="text" id="message" className="form-control" value={this.state.messageVal} onChange={(e) => {
                                            this.setState({
                                                messageVal: e.target.value,
                                            });
                                        }}
                                        placeholder="Write a message and press Enter..." required />
                                </Col>
                                <Col md="auto">
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
        else {
            return (
                <div id="foot">
                    <form onSubmit={this.onPickName}>
                        <Container fluid>
                            <Row className="align-items-center">
                                <Col>
                                    <input type="username" id="author" className="form-control" value={this.state.authorVal} onChange={(e) => {
                                        this.setState({
                                            authorVal: e.target.value,
                                        });
                                    }} placeholder="Your name here..." required />
                                </Col>
                                <Col md="auto">
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
    }

    OnSendMessage = (e) => {
        e.preventDefault();
        const author = this.state.author;
        const message = this.state.messageVal;
        SendMessage(author, message);

        this.setState({
            messageVal: "",
        });
    }

    onPickName = (e) => {
        e.preventDefault();
        this.setState({
            author: this.state.authorVal,
            named: true
        });
        OnEnterChat(this.state.authorVal);
    }
}
