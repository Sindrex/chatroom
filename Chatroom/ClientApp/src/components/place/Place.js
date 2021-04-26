import React, { Component } from 'react';
import { SetupChatConnection } from '../signalr/ChatConnection';
import { SetupPlaceConnection } from '../signalr/PlaceConnection';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PaintArea } from './PaintArea';
import { ColorPicker } from './ColorPicker';
import { OnlineTracker } from '../chat/OnlineTracker';
import { MessageFeed } from '../chat/MessageFeed';
import { InputFields } from '../chat/InputFields';
import image from './Place.png';

import './Place.css'

export class Place extends Component {
    static displayName = Place.name;
    state = {
        color: '#000000'
    }

    constructor(props) {
        super(props);
        SetupChatConnection();
        SetupPlaceConnection();
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={2} id="leftsidebar">
                        <a href="/">THE CHATROOM</a>
                        <OnlineTracker />
                        <MessageFeed />
                        <InputFields />
                    </Col>
                    <Col >
                        <div id="container">
                            <header id="header">
                                <img src={image} alt="..." width="400" height="150" />
                            </header>
                            <PaintArea color={this.state.color} />
                        </div>
                    </Col>
                    <Col xs={2}>
                        <ColorPicker color={this.state.color} handleChange={this.onColorChange} />
                    </Col>
                </Row>
            </Container>
        );
    }

    onColorChange = (color) => {
        this.setState({ color: color.hex });
    }

    pipetteSetColorRGB = ({ r, g, b }) => {
        let hexChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
        let factor = 16;

        let hexRes = "#";

        //red
        hexRes += hexChars[Math.floor(r / factor)];
        hexRes += hexChars[Math.floor(r % factor * factor)];

        //green
        hexRes += hexChars[Math.floor(g / factor)];
        hexRes += hexChars[Math.floor(g % factor * factor)];

        //blue
        hexRes += hexChars[Math.floor(b / factor)];
        hexRes += hexChars[Math.floor(b % factor * factor)];

        this.setState({ color: hexRes });
    }
}